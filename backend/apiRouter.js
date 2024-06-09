// apiRouter.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { Tech, Site, Note } from './models.js';
import { addTech, updateTech, addSite, updateSite, addNote, updateNote } from './firebase.js';
import { validateTech, validateSite, validateNote } from './validators.js';
import rateLimit from 'express-rate-limit';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logStream = fs.createWriteStream(path.join(__dirname, 'url.log'), { flags: 'a' });

const router = express.Router();

// Rate limiter: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later',
});

router.use(limiter);

router.use((req, res, next) => {
  const logMessage = `Received request to ${req.path}\n`;
  logStream.write(logMessage);
  console.log(logMessage.trim());
  next();
});

const handleValidation = (req, res, next, validateFn) => {
  const { error } = validateFn(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

router.post('/techs', (req, res, next) => handleValidation(req, res, next, validateTech), async (req, res, next) => {
  const { name } = req.body;
  try {
    if (process.env.DATABASE === 'mongo') {
      const tech = new Tech({ name });
      await tech.save();
    } else {
      await addTech({ name });
    }
    res.status(201).json({ message: 'Tech added' });
  } catch (error) {
    next(error);
  }
});

router.post('/sites', (req, res, next) => handleValidation(req, res, next, validateSite), async (req, res, next) => {
  const { name } = req.body;
  try {
    if (process.env.DATABASE === 'mongo') {
      const site = new Site({ name });
      await site.save();
    } else {
      await addSite({ name });
    }
    res.status(201).json({ message: 'Site added' });
  } catch (error) {
    next(error);
  }
});

router.post('/notes', (req, res, next) => handleValidation(req, res, next, validateNote), async (req, res, next) => {
  const { note, job, tech, timestamp } = req.body;
  try {
    if (process.env.DATABASE === 'mongo') {
      const newNote = new Note({ note, job, tech, timestamp });
      await newNote.save();
    } else {
      await addNote({ note, job, tech, timestamp: new Date(timestamp) });
    }
    res.status(201).json({ message: 'Note added' });
  } catch (error) {
    next(error);
  }
});

router.put('/techs/:id', (req, res, next) => handleValidation(req, res, next, validateTech), async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (process.env.DATABASE === 'mongo') {
      const updatedTech = await Tech.findByIdAndUpdate(id, { name }, { new: true });
      if (!updatedTech) return res.status(404).json({ error: 'Tech not found' });
    } else {
      await updateTech(id, { name });
    }
    res.status(200).json({ message: 'Tech updated' });
  } catch (error) {
    next(error);
  }
});

router.put('/sites/:id', (req, res, next) => handleValidation(req, res, next, validateSite), async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (process.env.DATABASE === 'mongo') {
      const updatedSite = await Site.findByIdAndUpdate(id, { name }, { new: true });
      if (!updatedSite) return res.status(404).json({ error: 'Site not found' });
    } else {
      await updateSite(id, { name });
    }
    res.status(200).json({ message: 'Site updated' });
  } catch (error) {
    next(error);
  }
});

router.put('/notes/:id', (req, res, next) => handleValidation(req, res, next, validateNote), async (req, res, next) => {
  const { id } = req.params;
  const { note, job, tech, timestamp } = req.body;
  try {
    if (process.env.DATABASE === 'mongo') {
      const updatedNote = await Note.findByIdAndUpdate(id, { note, job, tech, timestamp }, { new: true });
      if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
    } else {
      await updateNote(id, { note, job, tech, timestamp: new Date(timestamp) });
    }
    res.status(200).json({ message: 'Note updated' });
  } catch (error) {
    next(error);
  }
});

export default router;