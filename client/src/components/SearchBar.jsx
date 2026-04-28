import React, { useState } from 'react';
import './styles/SearchBar.css';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onSearch(searchTerm, category);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by book name, author, or category..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-filter"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
