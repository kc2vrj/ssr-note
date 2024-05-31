import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [techs, setTechs] = useState([]);
  const [sites, setSites] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for demonstration; replace with actual data fetching code
        const techsData = ['Tech 1', 'Tech 2'];
        const sitesData = ['Site 1', 'Site 2'];
        const notesData = [{ id: 1, note: 'Note 1' }, { id: 2, note: 'Note 2' }];

        setTechs(techsData);
        setSites(sitesData);
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Technicians</h2>
        <ul>
          {techs.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Sites</h2>
        <ul>
          {sites.map((site, index) => (
            <li key={index}>{site}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
