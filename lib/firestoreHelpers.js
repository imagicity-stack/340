"use client";

import { getFirestoreHelpers } from "./firebase";

const ensureDb = async () => {
  const helpers = await getFirestoreHelpers();
  if (!helpers.db || !helpers.collection || !helpers.doc) {
    throw new Error("Firestore has not been initialized.");
  }
  return helpers;
};

export const addDocument = async (collectionName, data) => {
  try {
    const { db, collection, addDoc } = await ensureDb();
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const updateDocument = async (collectionName, id, data) => {
  try {
    const { db, doc, updateDoc } = await ensureDb();
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, id) => {
  try {
    const { db, doc, deleteDoc } = await ensureDb();
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export const getCollection = async (collectionName) => {
  try {
    const { db, collection, getDocs } = await ensureDb();
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
};
