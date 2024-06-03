import React, { useState } from 'react';

const AdminPage = ({ techs = [], sites = [], notes = [] }) => {
  const [newTech, setNewTech] = useState('');
  const [newSite, setNewSite] = useState('');
  const [newNote, setNewNote] = useState('');

  const handleAddTech = async () => {
    try {
      // Send new tech to the server
      const response = await fetch('/api/techs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTech }),
      });

      if (response.ok) {
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
      // Send new site to the server
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newSite }),
      });

      if (response.ok) {
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
      // Send new note to the server
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: newNote }),
      });

      if (response.ok) {
        setNewNote('');
      } else {
        console.error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleEditTech = async (tech) => {
    try {
      // Edit tech in Firestore
      // This should be handled on the server side
      setNewTech('');
    } catch (error) {
      console.error('Error editing tech:', error);
    }
  };

  const handleDeleteTech = async (tech) => {
    try {
      // Delete tech from Firestore
      // This should be handled on the server side
    } catch (error) {
      console.error('Error deleting tech:', error);
    }
  };

  const handleEditSite = async (site) => {
    try {
      // Edit site in Firestore
      // This should be handled on the server side
      setNewSite('');
    } catch (error) {
      console.error('Error editing site:', error);
    }
  };

  const handleDeleteSite = async (site) => {
    try {
      // Delete site from Firestore
      // This should be handled on the server side
    } catch (error) {
      console.error('Error deleting site:', error);
    }
  };

  const handleEditNote = async (note) => {
    try {
      // Edit note in Firestore
      // This should be handled on the server side
      setNewNote('');
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  const handleDeleteNote = async (note) => {
    try {
      // Delete note from Firestore
      // This should be handled on the server side
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
              <li key={tech.id}>
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
              <li key={site.id}>
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
              <li key={note.id}>
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
