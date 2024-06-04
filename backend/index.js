import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';




const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://100.106.210.42:3000', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Connect to MongoDB (force IPv4)
mongoose.connect('mongodb://127.0.0.1:27017/notetakingapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models (define your schema here)
const Tech = mongoose.model('Tech', new mongoose.Schema({ name: String }));
const Site = mongoose.model('Site', new mongoose.Schema({ name: String }));
const Note = mongoose.model('Note', new mongoose.Schema({
  note: String,
  job: String,
  tech: String,
  timestamp: Date,
}));

// Routes
app.post('/api/techs', async (req, res) => {
  const tech = new Tech(req.body);
  try {
    await tech.save();
    res.status(201).send(tech);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/api/sites', async (req, res) => {
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

// Create HTTP server
// Listen
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
