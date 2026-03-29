# Deploying Sanskriti to Render

This guide outlines exactly how to deploy the React frontend and FastAPI backend to [Render.com](https://render.com).

## 1. Deploy the Backend (FastAPI)

Render hosts backends perfectly as **Web Services**.

1. Go to your Render Dashboard and create a **New Web Service**.
2. Connect this GitHub repository.
3. Use the following configuration:

| Field | Configuration |
|---|---|
| **Name** | `sanskriti-backend` (or similar) |
| **Root Directory** | `backend` |
| **Environment** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn server:app --host 0.0.0.0 --port $PORT` |

### Backend Environment Variables (`.env`)
Scroll down to the **Environment Variables** section and add:

```
MONGO_URL = mongodb+srv://jatainkumar12:Sanskriti%40123@sanskriti.t1pbmyp.mongodb.net/
DB_NAME = sanskriti_db
```
*(Note: We will add `CORS_ORIGINS` later after deploying the frontend)*.

4. **Click Create Web Service**. Render will build and deploy the API. Once live, test it by opening `https://<YOUR_BACKEND_URL>.onrender.com/api/health` in your browser.

---

## 2. Deploy the Frontend (React)

Render hosts React apps perfectly as **Static Sites**.

1. Create a **New Static Site** on Render.
2. Connect the exact same GitHub repository.
3. Use the following configuration:

| Field | Configuration |
|---|---|
| **Name** | `sanskriti-frontend` |
| **Root Directory** | `frontend` |
| **Build Command** | `yarn install && yarn build` |
| **Publish Directory** | `frontend/build` |

### Frontend Environment Variables
Scroll down to the **Environment Variables** section and add:

```
REACT_APP_BACKEND_URL = https://<YOUR_BACKEND_URL>.onrender.com
```
*(Replace with the actual URL you got from step 1)*.

4. **Click Create Static Site**. Render will build your React code and deploy the live site.

---

## 3. Final Step: Enable CORS

Now that your frontend has a live URL (e.g., `https://sanskriti-frontend.onrender.com`), you need to tell the backend to accept requests from it.

1. Go back to your **backend Web Service** in Render.
2. Go to **Environment** tab.
3. Add a new variable:
   - **Key:** `CORS_ORIGINS`
   - **Value:** `https://sanskriti-frontend.onrender.com` *(Replace with your actual frontend URL)*
4. Save the changes. Render will automatically redeploy the backend.

---

## ✅ You're live!

Your users can now visit your frontend URL, fill out the form, and their data will securely route through your backend into MongoDB!
