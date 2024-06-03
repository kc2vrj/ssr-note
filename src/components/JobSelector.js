import React, { useState, useEffect } from 'react';

const JobSelector = ({ selectedJob, setJob, sites = [] }) => {

  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  return (
    <select value={selectedJob} onChange={handleJobChange}>
      <option value="">All Jobs</option>
      {sites.map((site) => (
        <option key={site} value={site}>
          {site}
        </option>
      ))}
    </select>
  );
};

export default JobSelector;
