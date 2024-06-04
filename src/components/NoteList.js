import React, { useState } from 'react';
import JobSelector from './JobSelector';

const NoteList = ({ notes, sites, ...props }) => {
  const [filterJob, setFilterJob] = useState('');

  if (!Array.isArray(notes)) {
    return null; // or render a loading state
  }

  return (
    <div>
      <JobSelector selectedJob={filterJob} setJob={setFilterJob} />
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <p>{note.note}</p>
            <p>Job: {note.job}</p>
            <p>Tech: {note.tech}</p>
            <p>Timestamp: {new Date(note.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
