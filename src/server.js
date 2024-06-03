import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import fs from 'fs';
import AdminPage from './components/AdminPage';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/admin', (req, res) => {
  const reactComponent = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <AdminPage />
    </StaticRouter>
  );

  const indexFile = path.join(__dirname, 'build', 'index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    const propsScript = `
      <script>
        window.__INITIAL_PROPS__ = ${JSON.stringify({ /* Add props here */ })}
      </script>
    `;

    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${reactComponent}</div>`)
        .replace('<!--PROPS_SCRIPT-->', propsScript)
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com'
});

const db = admin.firestore();

// Export the db object for use in other server-side files
module.exports = { db };
