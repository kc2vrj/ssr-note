import React, { useState, useEffect } from 'react';
import { getCollection } from '../mongodb';

const JobSelector = ({ selectedJob, setJob }) => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const fetchSites = async () => {
      const sitesCollection = await getCollection('sites');
      const sitesData = await sitesCollection.find().toArray();
      setSites(sitesData.map(site => site.name));
    };

    fetchSites();
  }, []);

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
