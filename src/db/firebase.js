// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, deleteDoc, setDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized');

const db = getFirestore(app);
console.log('Firestore instance created');


const addDocument = async (collectionName, data) => {
  console.log(`Attempting to add document to ${collectionName}`);
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log(`Document added to ${collectionName} with ID: `, docRef.id);
    return docRef.id;
  } catch (e) {
    console.error(`Error adding document to ${collectionName}: `, e);
    throw e;
  }
};

const updateDocument = async (collectionName, id, data) => {
  console.log(`Attempting to update document in ${collectionName} with ID: ${id}`);
  try {
    await setDoc(doc(db, collectionName, id), data, { merge: true });
    console.log(`Document updated in ${collectionName} with ID: `, id);
  } catch (e) {
    console.error(`Error updating document in ${collectionName}: `, e);
    throw e;
  }
};

const getDocuments = async (collectionName) => {
  console.log(`Attempting to get documents from ${collectionName}`);
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    if (snapshot.empty) {
      console.log(`No documents found in ${collectionName}.`);
      return [];
    }

    const documents = [];
    snapshot.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    console.log(`Retrieved ${documents.length} documents from ${collectionName}`);
    return documents;
  } catch (e) {
    console.error(`Error getting documents from ${collectionName}: `, e);
    throw e;
  }
};

const deleteDocument = async (collectionName, id) => {
  console.log(`Attempting to delete document from ${collectionName} with ID: ${id}`);
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log(`Document deleted from ${collectionName} with ID: `, id);
  } catch (e) {
    console.error(`Error deleting document from ${collectionName}: `, e);
    throw e;
  }
};

// Techs
export const addTech = (tech) => {
  console.log('Adding tech:', tech);
  return addDocument('techs', tech);
};

export const updateTech = (id, tech) => {
  console.log('Updating tech:', id, tech);
  return updateDocument('techs', id, tech);
};

export const getTechs = () => {
  console.log('Getting all techs');
  return getDocuments('techs');
};

export const deleteTech = (id) => {
  console.log('Deleting tech:', id);
  return deleteDocument('techs', id);
};

// Sites
export const addSite = (site) => {
  console.log('Adding site:', site);
  return addDocument('sites', site);
};

export const updateSite = (id, site) => {
  console.log('Updating site:', id, site);
  return updateDocument('sites', id, site);
};

export const getSites = () => {
  console.log('Getting all sites');
  return getDocuments('sites');
};

export const deleteSite = (id) => {
  console.log('Deleting site:', id);
  return deleteDocument('sites', id);
};

// Notes
export const addNote = (note) => {
  console.log('Adding note:', note);
  return addDocument('notes', note);
};

export const updateNote = (id, note) => {
  console.log('Updating note:', id, note);
  return updateDocument('notes', id, note);
};

export const getNotes = () => {
  console.log('Getting all notes');
  return getDocuments('notes');
};

export const deleteNote = (id) => {
  console.log('Deleting note:', id);
  return deleteDocument('notes', id);
};