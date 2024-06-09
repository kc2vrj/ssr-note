// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log(`${collectionName} added with ID: `, docRef.id);
    return docRef.id;
  } catch (e) {
    console.error(`Error adding ${collectionName}: `, e);
    throw e;
  }
};

const updateDocument = async (collectionName, id, data) => {
  try {
    await updateDoc(doc(db, collectionName, id), data);
    console.log(`${collectionName} updated: `, id);
  } catch (e) {
    console.error(`Error updating ${collectionName}: `, e);
    throw e;
  }
};

export const addTech = (tech) => addDocument('techs', tech);
export const updateTech = (id, tech) => updateDocument('techs', id, tech);

export const addSite = (site) => addDocument('sites', site);
export const updateSite = (id, site) => updateDocument('sites', id, site);

export const addNote = (note) => addDocument('notes', note);
export const updateNote = (id, note) => updateDocument('notes', id, note);