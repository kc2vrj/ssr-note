import React, { useState } from 'react';
import { getCollection } from '../mongodb';
import JobSelector from './JobSelector';
import TechSelector from './TechSelector';

const NoteForm = () => {
  const [note, setNote] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form data to Firebase
    const notesCollection = await getCollection('notes');
    await notesCollection.insertOne({
      note,
      job: selectedJob,
      tech: selectedTech,
      timestamp: new Date().toISOString()
    });
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
