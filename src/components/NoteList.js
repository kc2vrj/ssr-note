import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import JobSelector from './JobSelector';

const NoteList = (props) => {
  const [notes, setNotes] = useState([]);
  const [filterJob, setFilterJob] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      let query = db.collection('notes');

      if (filterJob) {
        query = query.where('job', '==', filterJob);
      }

      const snapshot = await query.get();
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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
