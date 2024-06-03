import React, { useState, useEffect } from 'react';
import { getCollection } from '../mongodb';
import JobSelector from './JobSelector';

const NoteList = (props) => {
  const [notes, setNotes] = useState([]);
  const [filterJob, setFilterJob] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollection = await getCollection('notes');
      const query = filterJob ? { job: filterJob } : {};
      const notesData = await notesCollection.find(query).toArray();
      setNotes(notesData);
    };

    fetchNotes();
  }, [filterJob]);

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
