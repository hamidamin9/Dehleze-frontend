// src/components/Sidebar.js
import React, { useState } from 'react';
import '../CSS/ShopPage.css'


const Sidebar = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    onFilter(categoryId, priceRange);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const updatedPriceRange = [...priceRange];
    updatedPriceRange[e.target.name === 'min' ? 0 : 1] = value;
    setPriceRange(updatedPriceRange);
    onFilter(selectedCategory, updatedPriceRange);
  };

  return (
    <div className="sidebar">
      <h3>Filter Products</h3>

      {/* Category Filter */}
      <div className="filter-section">
        <h4>Category</h4>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <input
          type="number"
          name="min"
          placeholder="Min Price"
          value={priceRange[0]}
          onChange={handlePriceChange}
        />
        <input
          type="number"
          name="max"
          placeholder="Max Price"
          value={priceRange[1]}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
