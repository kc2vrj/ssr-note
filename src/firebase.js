import { initializeApp } from 'firebase-admin/app';

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://strat-notes-app-default-rtdb.firebaseio.com'
});
