

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FeaturedRooms = () => {
  const [roomData, setroomData] = useState([]);

  useEffect(() => {
    AOS.init(); // Initialize AOS
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://hotel-booking-platform-server-side.vercel.app/services');
      const jsonData = await response.json();
      setroomData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const limitedroomData = roomData.slice(0, 5);

  return (
    <div className='mt-20 px-5'>

       
       
      <h1
        className='mx-auto text-center  md:m-5 m-2 md:text-3xl text-xl font-bold '
        data-aos="fade-up" // Apply fade-up animation to this element
      >
        <Typewriter
          words={['Explore Our Luxurious Accommodations']}
          loop={0}
          typeSpeed={250}
          deleteSpeed={0}
          delaySpeed={0}
          cursor={null}
          typeWriterSpan={props => <span {...props} className="inline-block"/>}
        />
      </h1>
      <p className='text-gray-500 py-4 mx-auto justify-center text-center w-3/5'>Experience luxury redefined with unparalleled amenities, personalized service, and an ambiance that exceeds expectations. Explore our featured rooms and elevate your stay to unforgettable heights.
        </p>
      <div className=" grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 justify-center items-center gap-2 mt-8 ">
        {limitedroomData.map((room, index) => (
          <div
            key={index}
            className=" hover:border-green-700 px-1 hover:bg-green-100 cursor-pointer rounded-lg overflow-hidden shadow-lg border"
           
          >
            <Link to={`/roomDetails/${room._id}`}><img src={room.images} alt="Image" className="object-cover object-center w-full h-40" /></Link>
            <div className="p-2">
              <h2 className="text-normal font-semibold mb-1">{room.name && room.name.slice(0, 21)}</h2>
              <h2 className="text-xs text-gray-600 mb-1">{room.description && room.description.slice(0, 50)}...</h2>
     
            </div>
            <div className='p-2'>
              <Link to={`/roomDetails/${room._id}`}>
                <button
                  type="button"
                  className="btn-sm w-full bg-blue-500 text-gray-900 dark:text-gray-50 font-semibold px-4 rounded-md shadow-md hover:bg-violet-500"
                   
                >
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link
        to={`/rooms`}
        className='text-blue-600 shadow-md hover:bg-blue-600 hover:text-white  rounded-2xl mx-auto flex flex-col justify-center items-center m-5  text-lg font-medium  w-fit px-4 py-1 '
        data-aos="fade-up" 
      >
        See More
      </Link>
    </div>
  );
};

export default FeaturedRooms;
