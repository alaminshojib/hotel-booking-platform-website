// RoomFilter.js

import React, { useState } from 'react';

const RoomFilter = ({ onSubmit }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (minPrice === '' && maxPrice === '') {
      // If no range is specified, show full data
      onSubmit({ minPrice: 0, maxPrice: 10000 }); // Assuming the maximum price range is 10000
    } else {
      onSubmit({ minPrice: parseInt(minPrice), maxPrice: parseInt(maxPrice) });
    }
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    onSubmit({ minPrice: 0, maxPrice: 10000 }); // Reset to show full data
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center my-4">
      <input
        type="number"
        placeholder="Min Price"
        required
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border p-2 mr-2 bg-gray-300"
      />
      <input
        type="number"
        placeholder="Max Price"
        required
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border p-2 mr-2  bg-gray-300"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Apply Filter</button>
      <button type="button" onClick={handleReset} className="bg-gray-300 text-gray-700 p-2 rounded-md ml-2">Reset</button>
    </form>
  );
};

export default RoomFilter;
