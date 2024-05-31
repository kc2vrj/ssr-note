import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import JobSelector from './JobSelector';

const NoteList = (props) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('notes').onSnapshot((snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData);
    });

    return unsubscribe;
  }, []);
  const [filterJob, setFilterJob] = useState('');

  useEffect(() => {
    const unsubscribe = db
      .collection('notes')
      .where('job', '==', filterJob)
      .onSnapshot((snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesData);
      });

    return unsubscribe;
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
