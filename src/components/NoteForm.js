// src/components/NoteForm.js
import React, { useState } from 'react';
import JobSelector from './JobSelector';
import TechSelector from './TechSelector';
import { addNote } from '../db/firebase';

const NoteForm = () => {
  const [note, setNote] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note || !selectedJob || !selectedTech) {
      console.error('Please fill in all fields');
      return;
    }
    try {
      await addNote({
        note,
        job: selectedJob,
        tech: selectedTech,
        timestamp: new Date().toISOString(),
      });
      console.log('Note added successfully');
      setNote('');
      setSelectedJob('');
      setSelectedTech('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
        placeholder="Enter your note"
      />
      <JobSelector selectedJob={selectedJob} setJob={setSelectedJob} />
      <TechSelector selectedTech={selectedTech} setTech={setSelectedTech} />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;