// src/firebase.config.js

// Import Firebase core modules
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// List of required environment variables
const requiredKeys = [
  "VITE_apiKey",
  "VITE_authDomain",
  "VITE_projectId",
  "VITE_storageBucket",
  "VITE_messagingSenderId",
  "VITE_appId",
];

// Warn in console if any are missing (useful for debugging)
const missing = requiredKeys.filter((key) => !import.meta.env[key]);
if (missing.length) {
  console.warn(
    `⚠️ Missing Firebase config values for: ${missing.join(
      ", "
    )}. Check your .env file.`
  );
}

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase (avoid re-initialization during hot-reload)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Enable Google Auth Provider
const provider = new GoogleAuthProvider();

// ✅ Export everything correctly as named exports
export { app, auth, provider };
