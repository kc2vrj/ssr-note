import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = ({ techs = [], sites = [], notes = [] }) => {
  const [newTech, setNewTech] = useState('');
  const [newSite, setNewSite] = useState('');
  const [newNote, setNewNote] = useState('');

  const handleAddTech = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/techs', {
        name: newTech,
      });

      if (response.status === 201) {
        setNewTech('');
      } else {
        console.error('Failed to add tech');
      }
    } catch (error) {
      console.error('Error adding tech:', error);
    }
  };

  const handleAddSite = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/sites', {
        name: newSite,
      });

      if (response.status === 201) {
        setNewSite('');
      } else {
        console.error('Failed to add site');
      }
    } catch (error) {
      console.error('Error adding site:', error);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/notes', {
        note: newNote,
      });

      if (response.status === 201) {
        setNewNote('');
      } else {
        console.error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Add Tech</h2>
        <input
          type="text"
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
        />
        <button onClick={handleAddTech}>Add Tech</button>
      </div>
      <div>
        <h2>Add Site</h2>
        <input
          type="text"
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
        />
        <button onClick={handleAddSite}>Add Site</button>
      </div>
      <div>
        <h2>Add Note</h2>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
    </div>
  );
};

export default AdminPage;
