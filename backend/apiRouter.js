import express from 'express';
import fs from 'fs';
import path from 'path';
import { Tech, Site, Note } from './models.js';
import { ObjectId } from 'mongodb';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logStream = fs.createWriteStream(path.join(__dirname, 'url.log'), { flags: 'a' });




const router = express.Router();

router.use((req, res, next) => {
  const logMessage = `Received request to ${req.path}\n`;
  logStream.write(logMessage);
  console.log(logMessage.trim());
  next();
});

router.post('/techs', async (req, res) => {
  const { name } = req.body;
  try {
    const tech = new Tech({ name });
    await tech.save();
    res.status(201).send('Tech added');
  } catch (error) {
    res.status(500).send('Failed to add tech');
  }
});

router.post('/api/sites', async (req, res) => {
  const { name } = req.body;
  try {
    const site = new Site({ name });
    await site.save();
    res.status(201).send('Site added');
  } catch (error) {
    res.status(500).send('Failed to add site');
  }
});

router.post('/api/notes', async (req, res) => {
  const { note, job, tech, timestamp } = req.body;
  try {
    const newNote = new Note({ note, job, tech, timestamp });
    await newNote.save();
    res.status(201).send('Note added');
  } catch (error) {
    res.status(500).send('Failed to add note');
  }
});

router.put('/techs/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Tech.updateOne({ _id: new ObjectId(id) }, { $set: { name } });
    res.status(200).send('Tech updated');
  } catch (error) {
    res.status(500).send('Failed to update tech');
  }
});

router.put('/sites/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Site.updateOne({ _id: new ObjectId(id) }, { $set: { name } });
    res.status(200).send('Site updated');
  } catch (error) {
    res.status(500).send('Failed to update site');
  }
});

router.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { note, job, tech, timestamp } = req.body;
  try {
    await Note.updateOne({ _id: new ObjectId(id) }, { $set: { note, job, tech, timestamp } });
    res.status(200).send('Note updated');
  } catch (error) {
    res.status(500).send('Failed to update note');
  }
});

export default router;
