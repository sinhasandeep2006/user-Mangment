import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by name, email, or company..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
