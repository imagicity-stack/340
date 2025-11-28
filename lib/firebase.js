"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTwnA_smnjb1XNw06UuRQB_EtAh9w2nLo",
  authDomain: "realestate-b1513.firebaseapp.com",
  projectId: "realestate-b1513",
  storageBucket: "realestate-b1513.firebasestorage.app",
  messagingSenderId: "799816733554",
  appId: "1:799816733554:web:8b78198988713abe6f03eb"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
