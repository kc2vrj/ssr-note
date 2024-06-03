import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import fs from 'fs';
import App from './App';
import logger from './logger';

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
  logger.info(`Request received for ${req.url}`);
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      logger.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactComponent}</div>`)
    );
  });
});

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
import { MongoClient } from 'mongodb';

const uri = 'your_mongodb_connection_string';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db('note-taking-app');
  }
  return db;
};

const getCollection = async (collectionName) => {
  const database = await connectDB();
  return database.collection(collectionName);
};

export { getCollection };
