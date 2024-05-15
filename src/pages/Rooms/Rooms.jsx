// Rooms.js
import React, { useState, useEffect } from 'react';
import Room from './Room';
import RoomFilter from './RoomFilter';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5); // Number of rooms per page

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('https://hotel-booking-platform-server-side.vercel.app/services');
      const data = await response.json();

      // Filter out rooms that are already booked
      const bookedRoomIds = await fetchBookedRoomIds(); // Fetch booked room IDs
      const availableRooms = data.filter(room => !bookedRoomIds.includes(room._id));

      setRooms(availableRooms);
      setFilteredRooms(availableRooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      window.location.reload();
    }
  };

  const fetchBookedRoomIds = async () => {
    // Implement function to fetch booked room IDs from the backend
    // Return an array of booked room IDs
    // Example: return ['room1_id', 'room2_id', ...];
    return [];
  };

  const handleFilter = ({ minPrice, maxPrice }) => {
    const filtered = rooms.filter(room => {
      return room.price_per_night >= minPrice && room.price_per_night <= maxPrice;
    });
    setFilteredRooms(filtered);
    setCurrentPage(1); // Reset page number to 1 after filtering
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className='mx-auto text-center md:m-5 m-2 md:text-xl text-md font-bold '>
        Explore All Rooms
      </h1>
      <p className='text-gray-500 pb-5 lg:px-5 mx-auto justify-center text-xs text-center lg:w-3/5'>
        Discover our range of comfortable and stylish rooms tailored to suit your needs. Browse through our selection and find your ideal stay.
      </p>
      <RoomFilter onSubmit={handleFilter} />
      <div className='grid grid-cols-1  mx-auto justify-center'>
        {currentRooms.map(room => (
          <Room key={room._id} room={room} />
        ))}
      </div>
      <div className="flex justify-center m-4">
        {Array.from({ length: Math.ceil(filteredRooms.length / roomsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 hover:border-1 py-2 px-4 rounded-lg focus:outline-none ${
              currentPage === i + 1 ? 'font-bold text-blue-500' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
