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

  // ... (rest of the code remains the same)
};

export default AdminPage;