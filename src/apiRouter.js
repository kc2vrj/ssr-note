import express from 'express';
import { getCollection } from './mongoUtils';

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Received request to ${req.path}`);
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
