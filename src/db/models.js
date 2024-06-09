import mongoose from 'mongoose';

const techSchema = new mongoose.Schema({ name: { type: String, required: true } });
const siteSchema = new mongoose.Schema({ name: { type: String, required: true } });
const noteSchema = new mongoose.Schema({
  note: { type: String, required: true },
  job: { type: String, required: true },
  tech: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Tech = mongoose.model('Tech', techSchema);
const Site = mongoose.model('Site', siteSchema);
const Note = mongoose.model('Note', noteSchema);

export { Tech, Site, Note };
