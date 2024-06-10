// src/components/JobSelector.js
import React, { useState, useEffect } from 'react';
import { getSites } from '../db/firebase';  // Import getSites from firebase.js

const JobSelector = ({ selectedJob, setJob }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await getSites();
        setJobs(fetchedJobs);
        console.log('Fetched jobs:', fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs (sites):', error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  return (
    <select value={selectedJob} onChange={handleJobChange}>
      <option value="">Select a job</option>
      {jobs.map((job) => (
        <option key={job.id} value={job.name}>
          {job.name}
        </option>
      ))}
    </select>
  );
};

export default JobSelector;