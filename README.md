# Election Education Assistant

A smart, interactive educational platform designed to inform voters and simplify complex election topics. Powered by Next.js, Firebase, and fast Groq AI models for a seamless real-time chatbot experience.

## 🚀 Live Demo

**[Click here to visit the live app on Google Cloud Run](https://election-assistant-9504743892.us-central1.run.app)**

## ✨ Features

- **Interactive AI Assistant**: Chatbot specifically tailored to answer questions about elections, voting procedures, and general queries (powered by Groq AI).
- **Real-Time Data Access**: Supported by Firebase integration for fast reads and writes.
- **Modern User Interface**: Responsive and clean interface leveraging TailwindCSS.
- **Blazing Fast Performance**: Built on Next.js utilizing a custom standalone Docker build for efficient edge-like performance.

## 🛠️ Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS
- **Backend / Database:** Firebase
- **LLM Engine:** Groq API (Inference for chatbot engine)
- **Deployment & Hosting:** Docker, Google Cloud Run

## 🚀 Local Development Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or v20)
- npm

### Installation

1. Clone the repository and navigate into the `app` directory:
   ```bash
   cd "Election Education Assistant/app"
   ```

2. Install NPM packages:
   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   Create a `.env.local` file in the `app` folder and add your credentials:
   ```env
   GROQ_API_KEY=your_groq_api_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## ☁️ Deployment Reference

This project is currently deployed to **Google Cloud Run** using a custom `Dockerfile` that produces a `standalone` Next.js server image.

Local `node_modules` and compiled cached files (`.next`) are aggressively ignored via `.dockerignore` to ensure smooth multi-architecture compatibilities while building the image on Cloud Build.

### Updating the Deployment
To release a new version to Cloud Run, execute the following from the `app` directory:

```bash
gcloud run deploy election-assistant \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "GROQ_API_KEY=...,NEXT_PUBLIC_FIREBASE_API_KEY=...,NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...,NEXT_PUBLIC_FIREBASE_PROJECT_ID=...,NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...,NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...,NEXT_PUBLIC_FIREBASE_APP_ID=..."
```
*(Make sure to run this inside the `./app/` directory where the `package.json` is located)*
