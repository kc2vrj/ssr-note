import React, { useState, useEffect } from 'react';

const JobSelector = ({ selectedTech, setTech }) => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    // Fetch techs from the server
    const fetchTechs = async () => {
      // This should be handled on the server side
      setTechs([]);
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

export default JobSelector;
