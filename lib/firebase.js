"use client";

let firebaseApp = null;
let auth = null;
let db = null;
let storage = null;
let authModule = null;
let firestoreModule = null;
let storageModule = null;

const firebaseConfig = {
  apiKey:
    import.meta.env?.VITE_FIREBASE_API_KEY ||
    import.meta.env?.NEXT_PUBLIC_FIREBASE_API_KEY ||
    (typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_FIREBASE_API_KEY : undefined),
  authDomain:
    import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN ||
    import.meta.env?.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    (typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN : undefined),
  projectId:
    import.meta.env?.VITE_FIREBASE_PROJECT_ID ||
    import.meta.env?.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    (typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_FIREBASE_PROJECT_ID : undefined),
  storageBucket:
    import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET ||
    import.meta.env?.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    (typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET : undefined),
  messagingSenderId:
    import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    import.meta.env?.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    (typeof process !== "undefined"
      ? process.env?.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
      : undefined),
  appId:
    import.meta.env?.VITE_FIREBASE_APP_ID ||
    import.meta.env?.NEXT_PUBLIC_FIREBASE_APP_ID ||
    (typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_FIREBASE_APP_ID : undefined),
};

const isBrowser = typeof window !== "undefined";

const loadFirebase = async () => {
  if (!isBrowser) {
    return { firebaseApp: null, auth: null, db: null, storage: null };
  }

  if (firebaseApp && auth && db && storage) {
    return { firebaseApp, auth, db, storage };
  }

  const [appSdk, firestoreSdk, authSdk, storageSdk] = await Promise.all([
    import(/* @vite-ignore */ "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"),
    import(/* @vite-ignore */ "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"),
    import(/* @vite-ignore */ "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"),
    import(/* @vite-ignore */ "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js"),
  ]);

  authModule = authSdk;
  firestoreModule = firestoreSdk;
  storageModule = storageSdk;

  const { initializeApp, getApps, getApp } = appSdk;
  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

  auth = authModule.getAuth(firebaseApp);
  db = firestoreModule.getFirestore(firebaseApp);
  storage = storageModule.getStorage(firebaseApp);

  return { firebaseApp, auth, db, storage };
};

const getAuthHelpers = async () => {
  const services = await loadFirebase();
  return {
    ...services,
    signInWithEmailAndPassword: authModule?.signInWithEmailAndPassword,
    onAuthStateChanged: authModule?.onAuthStateChanged,
    signOut: authModule?.signOut,
  };
};

const getFirestoreHelpers = async () => {
  await loadFirebase();
  return {
    db,
    doc: firestoreModule?.doc,
    getDoc: firestoreModule?.getDoc,
    addDoc: firestoreModule?.addDoc,
    updateDoc: firestoreModule?.updateDoc,
    deleteDoc: firestoreModule?.deleteDoc,
    collection: firestoreModule?.collection,
    getDocs: firestoreModule?.getDocs,
  };
};

const getStorageHelpers = async () => {
  await loadFirebase();
  return {
    storage,
    ref: storageModule?.ref,
    uploadBytes: storageModule?.uploadBytes,
    getDownloadURL: storageModule?.getDownloadURL,
  };
};

export { firebaseApp, auth, db, storage, loadFirebase, getAuthHelpers, getFirestoreHelpers, getStorageHelpers };
