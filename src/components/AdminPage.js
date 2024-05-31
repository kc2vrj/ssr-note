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
    await techsCollection.add({ name: newTech });
    setNewTech('');
  };

  const handleAddSite = async () => {
    // Add new site to Firestore
    await sitesCollection.add({ name: newSite });
    setNewSite('');
  };

  const handleAddNote = async () => {
    // Add new note to Firestore
    await db.collection('notes').add({ note: newNote });
    setNewNote('');
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
              <button>Edit</button>
              <button>Delete</button>
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
              <button>Edit</button>
              <button>Delete</button>
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
              {note.note}
              <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
