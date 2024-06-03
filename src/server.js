import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import fs from 'fs';
import App from './App';
import { getCollection } from './mongodb';
import { connectToMongo } from './mongoUtils';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToMongo().then(() => {
  console.log('MongoDB connection established');
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(express.json());

app.post('/api/techs', async (req, res) => {
  const { name } = req.body;
  try {
    const db = await getCollection('techs');
    await db.insertOne({ name });
    res.status(201).send('Tech added');
  } catch (error) {
    res.status(500).send('Failed to add tech');
  }
});

app.post('/api/sites', async (req, res) => {
  const { name } = req.body;
  try {
    const db = await getCollection('sites');
    await db.insertOne({ name });
    res.status(201).send('Site added');
  } catch (error) {
    res.status(500).send('Failed to add site');
  }
});

app.post('/api/notes', async (req, res) => {
  const { note, job, tech, timestamp } = req.body;
  try {
    const db = await getCollection('notes');
    await db.insertOne({ note, job, tech, timestamp });
    res.status(201).send('Note added');
  } catch (error) {
    res.status(500).send('Failed to add note');
  }
});

app.get('*', async (req, res) => {
  const context = {};

  // Fetch data from MongoDB
  const techsCollection = await getCollection('techs').find().toArray();
  const sitesCollection = await getCollection('sites').find().toArray();
  const notesCollection = await getCollection('notes').find().toArray();

  const initialData = {
    techs: techsCollection.map(tech => tech.name),
    sites: sitesCollection.map(site => site.name),
    notes: notesCollection
  };

  const reactComponent = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App initialData={initialData} />
    </StaticRouter>
  );

  const indexFile = path.resolve(__dirname, '../build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
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
