// src/components/NoteList.js
import React, { useState, useEffect } from 'react';
import JobSelector from './JobSelector';
import { getNotes } from '../db/firebase';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [filterJob, setFilterJob] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
        console.log('Fetched notes:', fetchedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  // Filter notes based on selected job
  const filteredNotes = filterJob 
    ? notes.filter(note => note.job === filterJob)
    : notes;

  return (
    <div>
      <h2>Notes</h2>
      <JobSelector selectedJob={filterJob} setJob={setFilterJob} />
      
      {filteredNotes.length > 0 ? (
        <ul>
          {filteredNotes.map((note) => (
            <li key={note.id}>
              <p><strong>Note:</strong> {note.note}</p>
              <p><strong>Job:</strong> {note.job}</p>
              <p><strong>Tech:</strong> {note.tech}</p>
              <p><strong>Timestamp:</strong> {new Date(note.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes found{filterJob ? ` for job: ${filterJob}` : ''}.</p>
      )}
    </div>
  );
};

export default NoteList;