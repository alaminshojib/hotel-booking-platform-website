import React, { useState, useEffect } from 'react';
import Room from './Room';
import RoomFilter from './RoomFilter';
import { Typewriter } from 'react-simple-typewriter';
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 5; // Number of rooms per page

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    // Simulated fetch request to API endpoint
    // Replace with actual API call
    const response = await fetch('https://hotel-booking-platform-server-side.vercel.app/services');
    const data = await response.json();
    setRooms(data);
    setFilteredRooms(data.slice(0, roomsPerPage)); // Initially, show first page of rooms
  };

  const handleFilter = ({ minPrice, maxPrice }) => {
    const filtered = rooms.filter(room => {
      return room.price_per_night >= minPrice && room.price_per_night <= maxPrice;
    });
    setFilteredRooms(filtered.slice(0, roomsPerPage)); // Reset to first page after filtering
    setCurrentPage(1); // Reset page number to 1 after filtering
  };

  const handleClickRoom = roomId => {
    // Implement your routing logic here
  };

  const changePage = pageNumber => {
    const startIndex = (pageNumber - 1) * roomsPerPage;
    setFilteredRooms(rooms.slice(startIndex, startIndex + roomsPerPage));
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(rooms.length / roomsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1 className='mx-auto text-center md:m-5 m-2 md:text-xl text-md font-bold '>
        <Typewriter
          words={['Explore All Rooms']}
          loop={0}
          typeSpeed={250}
          deleteSpeed={0}
          delaySpeed={0}
          cursor={null}
          typeWriterSpan={props => <span {...props} className="inline-block"/>}
        />
      </h1>
      <p className='text-gray-500 pb-5 lg:px-5 mx-auto justify-center text-xs text-center lg:w-3/5'>Discover our range of comfortable and stylish rooms tailored to suit your needs. Browse through our selection and find your ideal stay.</p>
      <RoomFilter onSubmit={handleFilter} />
      <div className='grid grid-cols-1  mx-auto justify-center'>
        {rooms.length > 0 && filteredRooms.map(room => (
          <Room key={room.name} room={room} onClick={handleClickRoom} />
        ))}
      </div>
      <div className="flex justify-center m-4">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 border-2 hover:border-cyan-700 py-2 px-4 rounded-lg focus:outline-none"
        >
          <GrLinkPrevious />
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => changePage(number)}
            className={`mx-1  hover:border-1 py-2 px-4 rounded-lg focus:outline-none ${
              currentPage === number ? 'font-bold text-blue-500' : ''
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 border-2 hover:border-cyan-700 py-2 px-4 rounded-lg focus:outline-none"
        >
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

export default Rooms;
