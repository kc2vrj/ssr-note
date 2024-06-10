import React, { useState } from 'react';
import { createTech, createSite, createNote, removeTech, removeSite, removeNote, updateTech, updateSite, updateNote } from '../Uitls';

const AdminPage = ({ techs = [], sites = [], notes = [] }) => {
  const [newTech, setNewTech] = useState('');
  const [newSite, setNewSite] = useState('');
  const [newNote, setNewNote] = useState('');
  const [editTech, setEditTech] = useState(null);
  const [editSite, setEditSite] = useState(null);
  const [editNote, setEditNote] = useState(null);

  const handleAddItem = async (createFunc, newItem, setNewItem) => {
    try {
      const response = await createFunc(newItem);
      if (response.message) {
        setNewItem('');
        window.location.reload();
      } else {
        console.error(`Failed to add item: ${newItem}`);
      }
    } catch (error) {
      console.error(`Error adding item: ${newItem}`, error);
    }
  };

  const handleDeleteItem = async (deleteFunc, id) => {
    try {
      const response = await deleteFunc(id);
      if (response.message) {
        window.location.reload();
      } else {
        console.error(`Failed to delete item with ID: ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting item with ID: ${id}`, error);
    }
  };

  const handleEditTech = (tech) => {
    setEditTech(tech);
    setNewTech(tech.name);
  };

  const handleEditSite = (site) => {
    setEditSite(site);
    setNewSite(site.name);
  };

  const handleEditNote = (note) => {
    setEditNote(note);
    setNewNote(note.name);
  };

  const handleUpdateItem = async (updateFunc, id, newItem, setNewItem, resetEdit) => {
    try {
      const response = await updateFunc(id, newItem);
      if (response.message) {
        setNewItem('');
        resetEdit(null);
        window.location.reload();
      } else {
        console.error(`Failed to update item: ${newItem}`);
      }
    } catch (error) {
      console.error(`Error updating item: ${newItem}`, error);
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
        {editTech ? (
          <button onClick={() => handleUpdateItem(updateTech, editTech._id, newTech, setNewTech, setEditTech)}>Update Tech</button>
        ) : (
          <button onClick={() => handleAddItem(createTech, newTech, setNewTech)}>Add Tech</button>
        )}
        <ul>
          {techs.length > 0 ? (
            techs.map((tech) => (
              <li key={tech._id}>
                {tech.name}
                <button onClick={() => handleEditTech(tech)}>Edit</button>
                <button onClick={() => handleDeleteItem(removeTech, tech._id)}>Delete</button>
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
        {editSite ? (
          <button onClick={() => handleUpdateItem(updateSite, editSite._id, newSite, setNewSite, setEditSite)}>Update Site</button>
        ) : (
          <button onClick={() => handleAddItem(createSite, newSite, setNewSite)}>Add Site</button>
        )}
        <ul>
          {sites.length > 0 ? (
            sites.map((site) => (
              <li key={site._id}>
                {site.name}
                <button onClick={() => handleEditSite(site)}>Edit</button>
                <button onClick={() => handleDeleteItem(removeSite, site._id)}>Delete</button>
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
        {editNote ? (
          <button onClick={() => handleUpdateItem(updateNote, editNote._id, newNote, setNewNote, setEditNote)}>Update Note</button>
        ) : (
          <button onClick={() => handleAddItem(createNote, newNote, setNewNote)}>Add Note</button>
        )}
        <ul>
          {notes.length > 0 ? (
            notes.map((note) => (
              <li key={note._id}>
                <p>Note: {note.note}</p>
                <p>Job: {note.job}</p>
                <p>Tech: {note.tech}</p>
                <p>Timestamp: {new Date(note.timestamp).toLocaleString()}</p>
                <button onClick={() => handleEditNote(note)}>Edit</button>
                <button onClick={() => handleDeleteItem(removeNote, note._id)}>Delete</button>
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
