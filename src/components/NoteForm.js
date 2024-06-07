import React, { useState } from 'react';
import axios from 'axios';
import JobSelector from './JobSelector';
import TechSelector from './TechSelector';

const NoteForm = ({ sites }) => {
  const [note, setNote] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/notes', {
        note,
        job: selectedJob,
        tech: selectedTech,
        timestamp: new Date().toISOString(),
      });

      if (response.status === 201) {
        // Clear the form
        setNote('');
        setSelectedJob('');
        setSelectedTech('');
      } else {
        console.error('Failed to add note');
      }
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
