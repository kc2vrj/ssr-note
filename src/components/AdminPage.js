import React, { useState } from 'react';
import axios from 'axios';
import { createTech } from '../Uitls';

const AdminPage = ({ techs = [], sites = [], notes = [] }) => {
  const [newTech, setNewTech] = useState('');
  const [newSite, setNewSite] = useState('');
  const [newNote, setNewNote] = useState('');

  const handleAddTech = async () => {
    try {
      // const response = await axios.post('http://localhost:5000/api/techs', { name: newTech });
      const response = await createTech(newTech)

      if (response.status === 201) {
        setNewTech('');
        window.location.reload();
      } else {
        console.error('Failed to add tech');
      }
    } catch (error) {
      console.error('Error adding tech:', error);
    }
  };

  const handleAddSite = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/sites', { name: newSite });

      if (response.status === 201) {
        setNewSite('');
        window.location.reload();
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
        job: 'Example Job', // Placeholder values
        tech: 'Example Tech', // Placeholder values
        timestamp: new Date()
      });

      if (response.status === 201) {
        setNewNote('');
        window.location.reload();
      } else {
        console.error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleEditTech = async (tech) => {
    try {
      // Edit tech in Firestore (handled server-side)
      setNewTech('');
    } catch (error) {
      console.error('Error editing tech:', error);
    }
  };

  const handleDeleteTech = async (tech) => {
    try {
      await axios.delete(`http://localhost:5000/api/techs/${tech._id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting tech:', error);
    }
  };

  const handleEditSite = async (site) => {
    try {
      // Edit site in Firestore (handled server-side)
      setNewSite('');
    } catch (error) {
      console.error('Error editing site:', error);
    }
  };

  const handleDeleteSite = async (site) => {
    try {
      await axios.delete(`http://localhost:5000/api/sites/${site._id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting site:', error);
    }
  };

  const handleEditNote = async (note) => {
    try {
      // Edit note in Firestore (handled server-side)
      setNewNote('');
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  const handleDeleteNote = async (note) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${note._id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Technicians</h2>
        <input 
          value={newTech} 
          onChange={(e) => setNewTech(e.target.value)} 
          placeholder="Enter new technician name"
        />
        <button onClick={handleAddTech}>Add Tech</button>
        <ul>
          {techs.length > 0 ? (
            techs.map((tech) => (
              <li key={tech._id}>
                {tech.name}
                <button onClick={() => handleEditTech(tech)}>Edit</button>
                <button onClick={() => handleDeleteTech(tech)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No technicians found</li>
          )}
        </ul>
      </div>
      <div>
        <h2>Sites</h2>
        <input 
          value={newSite} 
          onChange={(e) => setNewSite(e.target.value)} 
          placeholder="Enter new site name"
        />
        <button onClick={handleAddSite}>Add Site</button>
        <ul>
          {sites.length > 0 ? (
            sites.map((site) => (
              <li key={site._id}>
                {site.name}
                <button onClick={() => handleEditSite(site)}>Edit</button>
                <button onClick={() => handleDeleteSite(site)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No sites found</li>
          )}
        </ul>
      </div>
      <div>
        <h2>Notes</h2>
        <input 
          value={newNote} 
          onChange={(e) => setNewNote(e.target.value)} 
          placeholder="Enter new note"
        />
        <button onClick={handleAddNote}>Add Note</button>
        <ul>
          {notes.length > 0 ? (
            notes.map((note) => (
              <li key={note._id}>
                <p>Note: {note.note}</p>
                <p>Job: {note.job}</p>
                <p>Tech: {note.tech}</p>
                <p>Timestamp: {new Date(note.timestamp).toLocaleString()}</p>
                <button onClick={() => handleEditNote(note)}>Edit</button>
                <button onClick={() => handleDeleteNote(note)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No notes found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
