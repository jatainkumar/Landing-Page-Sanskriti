# Sanskriti Landing Page

This is a full-stack application featuring a React frontend and a FastAPI backend. The application allows users to submit a waitlist form, which is stored in a MongoDB database and forwarded to a Zapier webhook.

## Project Structure

- `frontend/`: A React application built with `create-react-app` (via `@craco/craco`), utilizing TailwindCSS for styling and Radix UI components.
- `backend/`: A Python API built with FastAPI, using an AsyncIOMotorClient for MongoDB interactions.

## Prerequisites

Before running the project locally, ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **Yarn** (Package manager for the frontend)
- **Python** (v3.8+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas cluster)

## How to Run Locally

To get the application up and running on your local machine, you need to set up and run both the backend and frontend servers in separate terminals.

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install the Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend/` directory with the following variables:
   ```env
   MONGO_URL="mongodb://localhost:27017" # Replace with your MongoDB connection string if different
   DB_NAME="sanskriti_db"                 # Replace with your desired database name
   CORS_ORIGINS="http://localhost:3000"   # The URL of your frontend
   ```

5. Start the FastAPI backend server:
   ```bash
   uvicorn server:app --reload
   ```
   The backend server will run at `http://localhost:8000`. You can test the API by visiting `http://localhost:8000/api/` or view the Swagger UI documentation at `http://localhost:8000/docs`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the frontend dependencies using Yarn:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```
   The frontend application will start and should automatically open in your default browser at `http://localhost:3000`.

## Features
- **Waitlist Registration**: Capture user name, email, country, and interests.
- **Service Integration**: Seamlessly sends capture form data to Zapier for automated workflows.
- **Database Tracking**: All signups are persisted to MongoDB.
