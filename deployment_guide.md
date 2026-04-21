# Google Cloud Direct Deployment Guide

This guide covers exactly how to push your Election Assistant to GitHub and then deploy it directly from the Google Cloud Console. Because we've already set up the `Dockerfile` and configured `next.config.mjs` for standalone deployment, Google Cloud will natively understand how to compile and host your app with zero additional configurations!

---

## Step 1: Push Your Code to GitHub (Git)

Your local folder has already been staged via terminal by the assistant. Follow these exact steps to push them:

1. **Commit your code:**
   ```bash
   git commit -m "First commit: AI Election Education Assistant"
   ```

2. **Create a GitHub Repository:**
   - Go to [GitHub.com](https://github.com/) and create a new repository called `election-assistant`.
   - Do **NOT** add a README or .gitignore from the GitHub UI (keep the repo completely blank initially).

3. **Link and Push:**
   Copy the two commands GitHub gives you for an "Existing Repository", which will look exactly like this:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/election-assistant.git
   git branch -M main
   git push -u origin main
   ```

*(Your code is now securely on GitHub!)*

---

## Step 2: Deploy on Google Cloud Console

Now we will tell Google Cloud to automatically listen to your GitHub repository and build it container automatically!

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your project in the top left dropdown, or create a new one.
3. Search for **"Cloud Run"** in the top search bar and click on it.
4. Click the blue **"+ CREATE SERVICE"** button at the top.
5. Choose **"Continuously deploy new revisions from a source repository"** and connect to your GitHub account.
6. Select your `election-assistant` repository that you just pushed to.

**Configure the Build Options:**
- **Branch:** `^main$`
- **Build Type:** Select **Dockerfile**. (Google will automatically detect the `Dockerfile` I generated for you!)

**Configure Container Options:**
1. **Authentication:** Select **"Allow unauthenticated invocations"** (This makes your website public on the internet!).
2. **Environment Variables (CRITICAL STEP):** You must securely pass your `.env` variables to Google Cloud! Expand the *Container, Networking, Security* section, navigate to the **Variables & Secrets** tab, and add these exact keys based on your local `.env.local`:
   - Name: `GROQ_API_KEY` / Value: `gsk_lb9DqYD...`
   - Name: `NEXT_PUBLIC_FIREBASE_API_KEY` / Value: `AIzaSyA7...`
   - *(Add all other Firebase Configs from your setup file!)* 

## Step 3: Launch! 🚀
Click the **"CREATE"** button at the very bottom. 

Google Cloud Build will gracefully take over. It will use your custom Dockerfile to install dependencies, run the Next.js standalone build perfectly, and automatically route the website to a secure `https://...run.app` Google Cloud URL. 

> [!TIP]
> Because you chose Continuous Deployment, anytime you run `git push origin main` in the future to update code, Google Cloud will automatically detect it and deploy the newest version behind the scenes without any downtime!
