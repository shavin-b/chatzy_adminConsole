// Firebase initialization — selected by VITE_FIREBASE_* environment variables
// All config values come from environment variables (never hardcoded)

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Chatzy-only safety check: never silently connect this admin console to OrderFlow.
const EXPECTED_FIREBASE_PROJECT_ID = 'chatzy-d8ba4';
if (firebaseConfig.projectId !== EXPECTED_FIREBASE_PROJECT_ID) {
  throw new Error(
    'Chatzy Admin configuration error: VITE_FIREBASE_PROJECT_ID must be chatzy-d8ba4.'
  );
}

// Prevent multiple initializations during hot-reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
