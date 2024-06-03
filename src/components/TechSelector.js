import React, { useState, useEffect } from 'react';
import { techsCollection } from '../firebase';

const TechSelector = ({ selectedTech, setTech }) => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    const unsubscribe = techsCollection.onSnapshot((snapshot) => {
      const techsData = snapshot.docs.map((doc) => doc.data().name);
      setTechs(techsData);
    });

    return unsubscribe;
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
