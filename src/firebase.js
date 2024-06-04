import admin from 'firebase-admin';
import serviceAccount from './strat-notes-app-firebase-adminsdk-dcvx2-1962325dd1.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://strat-notes-app-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

// Create references to the 'techs' and 'sites' collections
const techsCollection = db.collection('techs');
const sitesCollection = db.collection('sites');

export { db, techsCollection, sitesCollection };
