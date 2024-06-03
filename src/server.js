import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import fs from 'fs';
import path from 'path';
import fs from 'fs';
import App from './App';
import apiRouter from './apiRouter';
import { connectToMongo, getCollection } from './mongoUtils';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToMongo().then(() => {
  console.log('MongoDB connection established');
});

const logStream = fs.createWriteStream(path.join(__dirname, 'url.log'), { flags: 'a' });

logStream.on('error', (err) => {
  console.error('Failed to write to log file:', err);
});

app.use((req, res, next) => {
  const logMessage = `Incoming request: ${req.method} ${req.url}\n`;
  logStream.write(logMessage);
  console.log(logMessage.trim());
  logStream.write(`Logged request: ${req.method} ${req.url}\n`);
  next();
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(express.json());

app.use('/api', apiRouter);

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
  console.log(`Server is listening on port ${PORT}`);
});
