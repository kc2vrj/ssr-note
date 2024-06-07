import mongoose from 'mongoose';

const Tech = mongoose.model('Tech', new mongoose.Schema({ name: String }));
const Site = mongoose.model('Site', new mongoose.Schema({ name: String }));
const Note = mongoose.model('Note', new mongoose.Schema({
  note: String,
  job: String,
  tech: String,
  timestamp: Date,
}));

export { Tech, Site, Note };
