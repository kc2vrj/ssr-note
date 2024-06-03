import React, { useState, useEffect } from 'react';
import { getCollection } from '../mongodb';

const TechSelector = ({ selectedTech, setTech }) => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    const fetchTechs = async () => {
      const techsCollection = await getCollection('techs');
      const techsData = await techsCollection.find().toArray();
      setTechs(techsData.map(tech => tech.name));
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
        <option key={tech} value={tech}>
          {tech}
        </option>
      ))}
    </select>
  );
};

export default TechSelector;
