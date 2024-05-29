import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Typewriter = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState('');
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    const fadeInInterval = setInterval(() => {
      if (opacity < 1) {
        setOpacity((prev) => prev + 0.1);
      } else {
        clearInterval(fadeInInterval);
      }
    }, 100); // Adjust fading speed here

    return () => {
      clearInterval(interval);
      clearInterval(fadeInInterval);
    };
  }, [text, delay, opacity]);

  return <span style={{ opacity }}>{displayText}</span>;
};

const Banner = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalServices = services.length;
  const slidesPerPage = 1;
  const maxPage = Math.ceil(totalServices / slidesPerPage);
  const intervalRef = React.useRef();
  const fetchInterval = 5000; // Adjust interval as needed
  const apiUrl = 'https://hotel-booking-platform-server-side.vercel.app/services';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        window.location.reload();
      }
    };

    fetchData();

    return () => clearInterval(intervalRef.current); 
  }, []);

  useEffect(() => {
    const nextSlide = (currentPage % maxPage) + 1;
    intervalRef.current = setInterval(() => setCurrentPage(nextSlide), fetchInterval);
    return () => clearInterval(intervalRef.current); // Cleanup interval on page change
  }, [currentPage, maxPage]);

  return (
    <div className='w-full rounded-md relative'>
      {services.slice((currentPage - 1) * slidesPerPage, currentPage * slidesPerPage).map((service, index) => (
        <div
          key={index}
          className="slide-content relative bg-no-repeat bg-cover max-h-svh object-center bg-center"
          style={{ backgroundImage: `url(${service.images[0]})`, minHeight: "400px" }}
        >
          <div className='absolute inset-0 bg-black opacity-40'></div>
          <div className='absolute bottom-8 md:bottom-12 left-0 right-0 text-center md:rounded-xl p-2 drop-shadow-md font-bold w-fit mx-auto'>
            <h3 className="text-md md:text-lg lg:text-3xl bg-gradient-to-br from-blue-300 to-violet-300 text-transparent bg-clip-text">
              <Typewriter text={service.name} delay={100} />
            </h3>
          </div>

        </div>
      ))}
      <div className="pagination">
        {/* Pagination components */}
      </div>
      <div style={{ backgroundImage: "url('https://i.ibb.co/dKP88vm/backgroundjpg.jpg')" }} className="p-6 bg-cover bg-center bg-no-repeat  md:absolute -bottom-12 right-0 left-0 z-[3] justify-center items-center mx-auto md:w-2/3 md:rounded-2xl ">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-md md:text-2xl tracking-tighter text-white font-bold">Up to 35% Off</h2>
            <div className="space-x-2 text-center text-white  lg:py-0">
              <span>For getting offer! Use code:</span>
              <span className="font-bold text-md">P-HERO</span>
            </div>
            <Link to="/rooms" className="text mt-2 rounded-md border px-2 py-1 hover:bg-blue-600 bg-green-600 dark:text-gray-50 border-gray-400 dark:border-gray-600">Show Rooms</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
