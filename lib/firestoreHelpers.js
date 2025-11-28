"use client";

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const ensureDb = () => {
  if (!db) {
    throw new Error("Firestore has not been initialized.");
  }
  return db;
};

export const addDocument = async (collectionName, data) => {
  try {
    const database = ensureDb();
    const collectionRef = collection(database, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const updateDocument = async (collectionName, id, data) => {
  try {
    const database = ensureDb();
    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, id) => {
  try {
    const database = ensureDb();
    const docRef = doc(database, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export const getCollection = async (collectionName) => {
  try {
    const database = ensureDb();
    const collectionRef = collection(database, collectionName);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
};
