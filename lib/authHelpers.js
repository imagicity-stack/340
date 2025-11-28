"use client";

import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

const ensureAuth = () => {
  if (!auth) {
    throw new Error("Firebase Auth has not been initialized.");
  }
  return auth;
};

export const loginAdmin = async (email, password) => {
  try {
    const authInstance = ensureAuth();
    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    const authInstance = ensureAuth();
    await signOut(authInstance);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const listenToAuth = (callback) => {
  try {
    const authInstance = ensureAuth();
    return onAuthStateChanged(authInstance, callback);
  } catch (error) {
    console.error("Error setting auth listener:", error);
    throw error;
  }
};
