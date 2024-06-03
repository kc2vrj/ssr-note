import React, { useState } from 'react';
import { getCollection } from '../mongodb';
import JobSelector from './JobSelector';
import logger from '../logger';
import TechSelector from './TechSelector';

const NoteForm = () => {
  const [note, setNote] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form data to Firebase
    const notesCollection = await getCollection('notes');
    logger.info('Inserting new note...');
    await notesCollection.insertOne({
      note,
      job: selectedJob,
      tech: selectedTech,
      timestamp: new Date().toISOString()
    });
    logger.info('Note inserted successfully');
    setNote('');
    setSelectedJob('');
    setSelectedTech('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      <JobSelector selectedJob={selectedJob} setJob={setSelectedJob} />
      <TechSelector selectedTech={selectedTech} setTech={setSelectedTech} />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
