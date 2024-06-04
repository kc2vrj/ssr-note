import React from 'react';
import PropTypes from 'prop-types';

const JobSelector = ({ selectedJob, setJob, sites }) => {
  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  return (
    <select value={selectedJob} onChange={handleJobChange}>
      <option value="">All Jobs</option>
      {sites.map((site, index) => (
        <option key={index} value={site}>
          {site}
        </option>
      ))}
    </select>
  );
};

JobSelector.propTypes = {
  selectedJob: PropTypes.string.isRequired,
  setJob: PropTypes.func.isRequired,
  sites: PropTypes.arrayOf(PropTypes.string)
};

JobSelector.defaultProps = {
  sites: []
};

export default JobSelector;
