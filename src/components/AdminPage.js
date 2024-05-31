import React, { useState, useEffect } from 'react';
import { techsCollection, sitesCollection, db } from '../firebase';

const AdminPage = () => {
  const [techs, setTechs] = useState([]);
  const [sites, setSites] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newTech, setNewTech] = useState('');
  const [newSite, setNewSite] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const unsubscribeTechs = techsCollection.onSnapshot((snapshot) => {
      const techsData = snapshot.docs.map((doc) => doc.data().name);
      setTechs(techsData);
    });

    const unsubscribeSites = sitesCollection.onSnapshot((snapshot) => {
      const sitesData = snapshot.docs.map((doc) => doc.data().name);
      setSites(sitesData);
    });

    const unsubscribeNotes = db.collection('notes').onSnapshot((snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    });

    return () => {
      unsubscribeTechs();
      unsubscribeSites();
      unsubscribeNotes();
    };
  }, []);

  const handleAddTech = async () => {
    // Add new tech to Firestore
    const docRef = await techsCollection.add({ name: newTech });
    setNewTech('');
    return docRef;
  };

  const handleAddSite = async () => {
    // Add new site to Firestore
    const docRef = await sitesCollection.add({ name: newSite });
    setNewSite('');
    return docRef;
  };

  const handleAddNote = async () => {
    // Add new note to Firestore
    await db.collection('notes').add({ note: newNote });
    setNewNote('');
  };

  const handleEditTech = async (tech) => {
    // Edit tech in Firestore
    const techRef = await handleAddTech();
    await techRef.update({ name: newTech });
    setNewTech('');
  };

  const handleDeleteTech = async (tech) => {
    // Delete tech from Firestore
    const techRef = await handleAddTech();
    await techRef.delete();
  };

  const handleEditSite = async (site) => {
    // Edit site in Firestore
    const siteRef = await handleAddSite();
    await siteRef.update({ name: newSite });
    setNewSite('');
  };

  const handleDeleteSite = async (site) => {
    // Delete site from Firestore
    const siteRef = await handleAddSite();
    await siteRef.delete();
  };

  const handleEditNote = async (note) => {
    // Edit note in Firestore
    const noteRef = db.collection('notes').doc(note.id);
    await noteRef.update({ note: newNote });
    setNewNote('');
  };

  const handleDeleteNote = async (note) => {
    // Delete note from Firestore
    const noteRef = db.collection('notes').doc(note.id);
    await noteRef.delete();
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Technicians</h2>
        <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
        <button onClick={handleAddTech}>Add Tech</button>
        <ul>
          {techs.map((tech, index) => (
            <li key={index}>
              {tech}
              <button onClick={() => handleEditTech(tech)}>Edit</button>
              <button onClick={() => handleDeleteTech(tech)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Sites</h2>
        <input value={newSite} onChange={(e) => setNewSite(e.target.value)} />
        <button onClick={handleAddSite}>Add Site</button>
        <ul>
          {sites.map((site, index) => (
            <li key={index}>
              {site}
              <button onClick={() => handleEditSite(site)}>Edit</button>
              <button onClick={() => handleDeleteSite(site)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Notes</h2>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button onClick={handleAddNote}>Add Note</button>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <p>Note: {note.note}</p>
              <p>Job: {note.job}</p>
              <p>Tech: {note.tech}</p>
              <p>Timestamp: {new Date(note.timestamp).toLocaleString()}</p>
              <button onClick={() => handleEditNote(note)}>Edit</button>
              <button onClick={() => handleDeleteNote(note)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
