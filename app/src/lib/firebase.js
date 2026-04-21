import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA793Nu3TPxyK5c47T3QGpQ4RdmBsdoytw",
  authDomain: "promptwar-fcc9a.firebaseapp.com",
  projectId: "promptwar-fcc9a",
  storageBucket: "promptwar-fcc9a.firebasestorage.app",
  messagingSenderId: "934931917449",
  appId: "1:934931917449:web:fece94487b34dce78f7458",
  measurementId: "G-NGQZ24RG6L",
};

// Initialize Firebase only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export default app;
