import React, { useState, useEffect } from 'react';
import { firebaseApp } from '../firebase';

const JobSelector = ({ selectedJob, setJob }) => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const unsubscribe = firebaseApp
      .firestore()
      .collection('sites')
      .onSnapshot((snapshot) => {
        const sitesData = snapshot.docs.map((doc) => doc.data().name);
        setSites(sitesData);
      });

    return unsubscribe;
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