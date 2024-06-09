import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './src/App';
import fs from 'fs';

const app = express();
const port = 3000;

import helmet from 'helmet';

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(helmet({
  permissionsPolicy: {
    features: {
      'run-ad-auction': []
    }
  }
}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/notetakingapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Tech = mongoose.model('Tech', new mongoose.Schema({ name: String }));
const Site = mongoose.model('Site', new mongoose.Schema({ name: String }));
const Note = mongoose.model('Note', new mongoose.Schema({
  note: String,
  job: String,
  tech: String,
  timestamp: Date,
}));

// Server-Side Rendering
app.get('*', (req, res) => {
  const context = {};
  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )
    );
  });
});

// Server-Side Functions
app.post('/add-tech', async (req, res) => {
  const tech = new Tech(req.body);
  try {
    await tech.save();
    res.status(201).send(tech);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/add-site', async (req, res) => {
  const site = new Site(req.body);
  try {
    await site.save();
    res.status(201).send(site);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/api/notes', async (req, res) => {
  const note = new Note(req.body);
  try {
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Listen
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
