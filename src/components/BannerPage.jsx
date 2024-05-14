import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [autoplayInterval, setAutoplayInterval] = useState(2500);
  const totalServices = services.length;
  const slidesPerPage = 1;
  const maxPage = Math.ceil(totalServices / slidesPerPage);
  const intervalRef = useRef();

  useEffect(() => {
    fetchServices();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const nextSlide = (currentPage % maxPage) + 1;
    intervalRef.current = setInterval(() => setCurrentPage(nextSlide), autoplayInterval);
    return () => clearInterval(intervalRef.current);
  }, [currentPage, autoplayInterval, maxPage]);

  const fetchServices = async () => {
    try {
      const response = await fetch('https://hotel-booking-platform-server-side.vercel.app/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
    }
  };




  return (
    <div className='w-full rounded-md relative'>
      {services.slice((currentPage - 1) * slidesPerPage, currentPage * slidesPerPage).map((service, index) => (
        <div
          key={index}
          className="slide-content bg-no-repeat bg-cover max-h-svh object-center bg-center"
          style={{ backgroundImage: `url(${service.images[0]})`, minHeight: "400px" }}
        >
          <div className='absolute bottom-36 md:bottom-16 left-0 right-0 text-center bg-gray-200 md:rounded-xl p-2 text-black drop-shadow-md font-bold w-fit mx-auto'>
            <h3 className="text-md md:text-lg lg:text-3xl">{service.name}</h3>
            <p className="text-xs text-gray-500 md:text-base lg:text-md">{service.description}</p>
          </div>
        </div>
      ))}
      <div className="pagination">
      </div>
      <div style={{ backgroundImage: "url('https://i.ibb.co/dKP88vm/backgroundjpg.jpg')" }} className="p-6 bg-cover bg-center bg-no-repeat  md:absolute -bottom-12 right-0 left-0 z-[3] justify-center items-center mx-auto md:w-2/3 md:rounded-2xl ">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-md md:text-2xl tracking-tighter text-white font-bold">Up to 35% Off
            </h2>
            <div className="space-x-2 text-center text-white  lg:py-0">
              <span>For getting offer! Use code:</span>
              <span className="font-bold text-md">P-HERO</span>
            </div>
            <Link className="text mt-2 rounded-md border px-2 py-1 hover:bg-blue-600 bg-green-600 dark:text-gray-50 border-gray-400 dark:border-gray-600" >Show Rooms</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
