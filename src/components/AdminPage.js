// src/components/AdminPage.js
import React, { useState, useEffect } from 'react';
import { 
  addTech, updateTech, deleteTech, getTechs,
  addSite, updateSite, deleteSite, getSites,
  addNote, updateNote, deleteNote, getNotes
} from '../db/firebase';

const AdminPage = () => {
  const [techs, setTechs] = useState([]);
  const [sites, setSites] = useState([]);
  const [notes, setNotes] = useState([]);

  const [newTech, setNewTech] = useState('');
  const [newSite, setNewSite] = useState('');

  const [editTech, setEditTech] = useState(null);
  const [editedTech, setEditedTech] = useState('');

  const [editSite, setEditSite] = useState(null);
  const [editedSite, setEditedSite] = useState('');

  const [editNote, setEditNote] = useState(null);
  const [editedNote, setEditedNote] = useState({ note: '', job: '', tech: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTechs(await getTechs());
        setSites(await getSites());
        setNotes(await getNotes());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddTech = async () => {
    try {
      await addTech({ name: newTech });
      setTechs(await getTechs());
      setNewTech('');
    } catch (error) {
      console.error("Error adding tech:", error);
    }
  };

  const handleAddSite = async () => {
    try {
      await addSite({ name: newSite });
      setSites(await getSites());
      setNewSite('');
    } catch (error) {
      console.error("Error adding site:", error);
    }
  };

  const handleEditTech = (tech) => {
    setEditTech(tech);
    setEditedTech(tech.name);
  };

  const handleEditSite = (site) => {
    setEditSite(site);
    setEditedSite(site.name);
  };

  const handleEditNote = (note) => {
    setEditNote(note);
    setEditedNote({ note: note.note, job: note.job, tech: note.tech });
  };

  const handleEditedNoteChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const handleUpdateItem = async (updateFunc, id, newItem, resetEdit) => {
    try {
      await updateFunc(id, newItem);
      resetEdit(null);
      setTechs(await getTechs());
      setSites(await getSites());
      setNotes(await getNotes());
    } catch (error) {
      console.error(`Error updating item`, error);
    }
  };

  const handleDeleteItem = async (deleteFunc, id) => {
    try {
      await deleteFunc(id);
      setTechs(await getTechs());
      setSites(await getSites());
      setNotes(await getNotes());
    } catch (error) {
      console.error(`Error deleting item with ID: ${id}`, error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Add Technician</h2>
        <input 
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
          placeholder="Enter technician name"
        />
        <button onClick={handleAddTech}>Add Tech</button>
      </div>
      <div>
        <h2>Technicians</h2>
        <ul>
          {techs.map((tech) => (
            <li key={tech.id}>
              {editTech && editTech.id === tech.id ? (
                <div>
                  <input 
                    value={editedTech} 
                    onChange={(e) => setEditedTech(e.target.value)} 
                    placeholder="Edit technician name"
                  />
                  <button onClick={() => handleUpdateItem(updateTech, tech.id, { name: editedTech }, setEditTech)}>
                    Update Tech
                  </button>
                  <button onClick={() => setEditTech(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {tech.name}
                  <button onClick={() => handleEditTech(tech)}>Edit</button>
                  <button onClick={() => handleDeleteItem(deleteTech, tech.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add Site</h2>
        <input 
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
          placeholder="Enter site name"
        />
        <button onClick={handleAddSite}>Add Site</button>
      </div>
      <div>
        <h2>Sites</h2>
        <ul>
          {sites.map((site) => (
            <li key={site.id}>
              {editSite && editSite.id === site.id ? (
                <div>
                  <input 
                    value={editedSite} 
                    onChange={(e) => setEditedSite(e.target.value)} 
                    placeholder="Edit site name"
                  />
                  <button onClick={() => handleUpdateItem(updateSite, site.id, { name: editedSite }, setEditSite)}>
                    Update Site
                  </button>
                  <button onClick={() => setEditSite(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {site.name}
                  <button onClick={() => handleEditSite(site)}>Edit</button>
                  <button onClick={() => handleDeleteItem(deleteSite, site.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {editNote && editNote.id === note.id ? (
                <div>
                  <input 
                    name="note"
                    value={editedNote.note} 
                    onChange={handleEditedNoteChange} 
                    placeholder="Edit note"
                  />
                  <input 
                    name="job"
                    value={editedNote.job} 
                    onChange={handleEditedNoteChange} 
                    placeholder="Edit job"
                  />
                  <input 
                    name="tech"
                    value={editedNote.tech} 
                    onChange={handleEditedNoteChange} 
                    placeholder="Edit tech"
                  />
                  <button onClick={() => handleUpdateItem(updateNote, note.id, editedNote, setEditNote)}>
                    Update Note
                  </button>
                  <button onClick={() => setEditNote(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>Note: {note.note}</p>
                  <p>Job: {note.job}</p>
                  <p>Tech: {note.tech}</p>
                  <p>Timestamp: {new Date(note.timestamp).toLocaleString()}</p>
                  <button onClick={() => handleEditNote(note)}>Edit</button>
                  <button onClick={() => handleDeleteItem(deleteNote, note.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
