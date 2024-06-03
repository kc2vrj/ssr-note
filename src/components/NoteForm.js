import React, { useState } from 'react';
import JobSelector from './JobSelector';
import TechSelector from './TechSelector';

const NoteForm = ({ sites }) => {
  const [note, setNote] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send form data to the server
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note,
        job: selectedJob,
        tech: selectedTech,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      // Clear the form
      setNote('');
      setSelectedJob('');
      setSelectedTech('');
    } else {
      console.error('Failed to add note');
    }
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
