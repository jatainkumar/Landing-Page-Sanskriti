from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import requests


ROOT_DIR = Path(__file__).parent
env_path = ROOT_DIR / '.env'
if env_path.exists():
    load_dotenv(env_path)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'sanskriti_db')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class WaitlistSubmission(BaseModel):
    firstName: str
    email: EmailStr
    country: str
    interests: List[str]

class WaitlistResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    firstName: str
    email: str
    country: str
    interests: List[str]
    timestamp: datetime

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/waitlist", response_model=WaitlistResponse)
async def submit_waitlist(submission: WaitlistSubmission):
    """Submit waitlist form to Zapier webhook and store in MongoDB"""
    try:
        # Prepare data for storage
        waitlist_data = {
            "id": str(uuid.uuid4()),
            "firstName": submission.firstName,
            "email": submission.email,
            "country": submission.country,
            "interests": submission.interests,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        
        # Store in MongoDB
        await db.waitlist.insert_one(waitlist_data)
        
        # Send to Zapier webhook
        zapier_url = "https://hooks.zapier.com/hooks/catch/26990661/unhyf0p/"
        zapier_payload = {
            "firstName": submission.firstName,
            "email": submission.email,
            "country": submission.country,
            "interests": ", ".join(submission.interests),
            "timestamp": waitlist_data["timestamp"]
        }
        
        # Make non-blocking request to Zapier
        try:
            requests.post(zapier_url, json=zapier_payload, timeout=5)
        except Exception as zapier_error:
            # Log but don't fail if Zapier fails
            logging.warning(f"Zapier webhook failed: {zapier_error}")
        
        # Convert timestamp back to datetime for response
        waitlist_data['timestamp'] = datetime.fromisoformat(waitlist_data['timestamp'])
        return WaitlistResponse(**waitlist_data)
        
    except Exception as e:
        logging.error(f"Waitlist submission error: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit waitlist form")

@api_router.get("/waitlist", response_model=List[WaitlistResponse])
async def get_waitlist():
    """Get all waitlist submissions"""
    waitlist_entries = await db.waitlist.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for entry in waitlist_entries:
        if isinstance(entry['timestamp'], str):
            entry['timestamp'] = datetime.fromisoformat(entry['timestamp'])
    
    return waitlist_entries

@api_router.get("/health")
async def health_check():
    """Check MongoDB connection and return waitlist count"""
    try:
        await client.admin.command('ping')
        count = await db.waitlist.count_documents({})
        return {
            "status": "healthy",
            "mongodb": "connected",
            "waitlist_count": count
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"MongoDB connection failed: {str(e)}") 

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=False,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()