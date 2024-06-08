import express from 'express';
import fs from 'fs';
import path from 'path';
import { getCollection } from './mongoUtils.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logStream = fs.createWriteStream(path.join(__dirname, 'url.log'), { flags: 'a' });


logStream.on('error', (err) => {
  console.error('Failed to write to log file:', err);
});

logStream.on('error', (err) => {
  console.error('Failed to write to log file:', err);
});

const router = express.Router();

router.use((req, res, next) => {
  const logMessage = `Received request to ${req.path}\n`;
  logStream.write(logMessage);
  console.log(logMessage.trim());
  logStream.write(`Logged request: ${req.method} ${req.url}\n`);
  logStream.write(`Logged request: ${req.method} ${req.url}\n`);
  next();
});

router.post('/techs', async (req, res) => {
  const { name } = req.body;
  try {
    const db = await getCollection('techs');
    await db.insertOne({ name });
    res.status(201).send('Tech added');
  } catch (error) {
    res.status(500).send('Failed to add tech');
  }
});

router.post('/api/sites', async (req, res) => {
  const { name } = req.body;
  try {
    const db = await getCollection('sites');
    await db.insertOne({ name });
    res.status(201).send('Site added');
  } catch (error) {
    res.status(500).send('Failed to add site');
  }
});

router.post('/api/notes', async (req, res) => {
  const { note, job, tech, timestamp } = req.body;
  try {
    const db = await getCollection('notes');
    await db.insertOne({ note, job, tech, timestamp });
    res.status(201).send('Note added');
  } catch (error) {
    res.status(500).send('Failed to add note');
  }
});

router.put('/techs/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const db = await getCollection('techs');
    await db.updateOne({ _id: new ObjectId(id) }, { $set: { name } });
    res.status(200).send('Tech updated');
  } catch (error) {
    res.status(500).send('Failed to update tech');
  }
});

router.put('/sites/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const db = await getCollection('sites');
    await db.updateOne({ _id: new ObjectId(id) }, { $set: { name } });
    res.status(200).send('Site updated');
  } catch (error) {
    res.status(500).send('Failed to update site');
  }
});

router.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { note, job, tech, timestamp } = req.body;
  try {
    const db = await getCollection('notes');
    await db.updateOne({ _id: new ObjectId(id) }, { $set: { note, job, tech, timestamp } });
    res.status(200).send('Note updated');
  } catch (error) {
    res.status(500).send('Failed to update note');
  }
});

export default router;
