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
    <form onSubmit={handleSubmit} className="flex justify-center items-center my-2 lg:my-4">
      <input
        type="number"
        placeholder="Min Price"
        required
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border rounded-l-lg p-1 px-1 text-black mr-2 bg-gray-300 w-32 lg:w-52"
      />
      <input
        type="number"
        placeholder="Max Price"
        required
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border p-1 px-1 mr-2 rounded-r-lg text-black bg-gray-300 w-32 lg:w-52"
      />
      <button type="submit" className="bg-blue-500 text-white  btn-sm rounded-md">Apply Filter</button>
      <button type="button" onClick={handleReset} className="bg-gray-300 btn-sm text-gray-700  rounded-md ml-2">Reset</button>
    </form>
  );
};

export default RoomFilter;
