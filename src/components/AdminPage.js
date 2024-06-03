import React, { useState } from 'react';

const AdminPage = ({ techs = [], sites = [], notes = [] }) => {
  const [newTech, setNewTech] = useState('');
  const [newSite, setNewSite] = useState('');
  const [newNote, setNewNote] = useState('');

  const handleAddTech = async () => {
    // Add new tech to Firestore
    const techsCollection = await getCollection('techs');
    const docRef = await techsCollection.insertOne({ name: newTech });
    setNewTech('');
    return docRef;
  };

  const handleAddSite = async () => {
    // Add new site to Firestore
    const sitesCollection = await getCollection('sites');
    const docRef = await sitesCollection.insertOne({ name: newSite });
    setNewSite('');
    return docRef;
  };

  const handleAddNote = async () => {
    // Add new note to Firestore
    const notesCollection = await getCollection('notes');
    await notesCollection.insertOne({ note: newNote });
    setNewNote('');
  };

  const handleEditTech = async (tech) => {
    // Edit tech in Firestore
    const techsCollection = await getCollection('techs');
    await techsCollection.updateOne({ name: tech }, { $set: { name: newTech } });
    setNewTech('');
  };

  const handleDeleteTech = async (tech) => {
    // Delete tech from Firestore
    const techsCollection = await getCollection('techs');
    await techsCollection.deleteOne({ name: tech });
  };

  const handleEditSite = async (site) => {
    // Edit site in Firestore
    const sitesCollection = await getCollection('sites');
    await sitesCollection.updateOne({ name: site }, { $set: { name: newSite } });
    setNewSite('');
  };

  const handleDeleteSite = async (site) => {
    // Delete site from Firestore
    const sitesCollection = await getCollection('sites');
    await sitesCollection.deleteOne({ name: site });
  };

  const handleEditNote = async (note) => {
    // Edit note in Firestore
    const notesCollection = await getCollection('notes');
    await notesCollection.updateOne({ _id: note.id }, { $set: { note: newNote } });
    setNewNote('');
  };

  const handleDeleteNote = async (note) => {
    // Delete note from Firestore
    const notesCollection = await getCollection('notes');
    await notesCollection.deleteOne({ _id: note.id });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Technicians</h2>
        <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
        <button onClick={handleAddTech}>Add Tech</button>
        <ul>
          {techs && techs.length > 0 ? (
            techs.map((tech, index) => (
              <li key={index}>
                {tech}
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
        <input value={newSite} onChange={(e) => setNewSite(e.target.value)} />
        <button onClick={handleAddSite}>Add Site</button>
        <ul>
          {sites && sites.length > 0 ? (
            sites.map((site, index) => (
              <li key={index}>
                {site}
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
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button onClick={handleAddNote}>Add Note</button>
        <ul>
          {notes && notes.length > 0 ? (
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
