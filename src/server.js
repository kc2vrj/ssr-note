import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import fs from 'fs';
import App from './App';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', (req, res) => {
  const context = {};
  const reactComponent = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve(__dirname, '../build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactComponent}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
import admin from 'firebase-admin';
import serviceAccount from './strat-notes-app-firebase-adminsdk-dcvx2-1962325dd1.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://strat-notes-app-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

// Export the db object for use in other server-side files
export { db };
