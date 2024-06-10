// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, deleteDosc, setDoc } from 'firebase/firestore';
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
    await setDoc(doc(db, collectionName, id), data, { merge: true });
    console.log(`${collectionName} updated: `, id);
  } catch (e) {
    console.error(`Error updating ${collectionName}: `, e);
    throw e;
  }
};

const getDocuments = async (collectionName) => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    if (snapshot.empty) {
      console.log(`No matching documents in ${collectionName}.`);
      return [];
    }

    const documents = [];
    snapshot.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (e) {
    console.error(`Error getting documents from ${collectionName}: `, e);
    throw e;
  }
};

const deleteDocument = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log(`${collectionName} deleted: `, id);
  } catch (e) {
    console.error(`Error deleting ${collectionName}: `, e);
    throw e;
  }
};

// Techs
export const addTech = (tech) => addDocument('techs', tech);
export const updateTech = (id, tech) => updateDocument('techs', id, tech);
export const getTechs = () => getDocuments('techs');
export const deleteTech = (id) => deleteDocument('techs', id);

// Sites
export const addSite = (site) => addDocument('sites', site);
export const updateSite = (id, site) => updateDocument('sites', id, site);
export const getSites = () => getDocuments('sites');
export const deleteSite = (id) => deleteDocument('sites', id);

// Notes
export const addNote = (note) => addDocument('notes', note);
export const updateNote = (id, note) => updateDocument('notes', id, note);
export const getNotes = () => getDocuments('notes');
export const deleteNote = (id) => deleteDocument('notes', id);