import express from 'express';
import fs from 'fs';
import path from 'path';
import { getCollection } from './mongoUtils';

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
    const db = await getCollection('techs');
    await db.insertOne({ name });
    res.status(201).send('Tech added');
  } catch (error) {
    res.status(500).send('Failed to add tech');
  }
});

router.post('/sites', async (req, res) => {
  const { name } = req.body;
  try {
    const db = await getCollection('sites');
    await db.insertOne({ name });
    res.status(201).send('Site added');
  } catch (error) {
    res.status(500).send('Failed to add site');
  }
});

router.post('/notes', async (req, res) => {
  const { note, job, tech, timestamp } = req.body;
  try {
    const db = await getCollection('notes');
    await db.insertOne({ note, job, tech, timestamp });
    res.status(201).send('Note added');
  } catch (error) {
    res.status(500).send('Failed to add note');
  }
});

export default router;
