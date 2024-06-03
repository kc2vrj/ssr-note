import React, { useState, useEffect } from 'react';
import { getCollection } from '../mongodb';
import JobSelector from './JobSelector';
import logger from '../logger';

const NoteList = ({ notes, ...props }) => {
  const [filterJob, setFilterJob] = useState('');

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
