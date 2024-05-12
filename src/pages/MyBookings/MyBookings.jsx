// MyBookings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Booked from './Booked';

export default function MyBookings() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bookings');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Booked data={data} />
    </div>
  );
}
