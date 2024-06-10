// src/components/TechSelector.js
import React, { useState, useEffect } from 'react';
import { getTechs } from '../db/firebase';  // Import getTechs from firebase.js

const TechSelector = ({ selectedTech, setTech }) => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const fetchedTechs = await getTechs();
        setTechs(fetchedTechs);
        console.log('Fetched techs:', fetchedTechs);
      } catch (error) {
        console.error('Error fetching techs:', error);
      }
    };

    fetchTechs();
  }, []);

  const handleTechChange = (e) => {
    setTech(e.target.value);
  };

  return (
    <select value={selectedTech} onChange={handleTechChange}>
      <option value="">Select a tech</option>
      {techs.map((tech) => (
        <option key={tech.id} value={tech.name}>
          {tech.name}
        </option>
      ))}
    </select>
  );
};

export default TechSelector;