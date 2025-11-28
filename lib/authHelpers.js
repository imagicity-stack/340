"use client";

import { getAuthHelpers } from "./firebase";

const ensureAuth = async () => {
  const { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut } = await getAuthHelpers();
  if (!auth || !signInWithEmailAndPassword || !onAuthStateChanged || !signOut) {
    throw new Error("Firebase Auth has not been initialized.");
  }
  return { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut };
};

export const loginAdmin = async (email, password) => {
  try {
    const { auth, signInWithEmailAndPassword } = await ensureAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    const { auth, signOut } = await ensureAuth();
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const listenToAuth = async (callback) => {
  try {
    const { auth, onAuthStateChanged } = await ensureAuth();
    return onAuthStateChanged(auth, callback);
  } catch (error) {
    console.error("Error setting auth listener:", error);
    throw error;
  }
};
