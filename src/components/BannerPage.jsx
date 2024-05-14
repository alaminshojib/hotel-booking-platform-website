import React, { useState, useEffect, useRef } from 'react';

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
      console.error('Error fetching services:', error);
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
          <div className='absolute bottom-16 left-0 right-0 text-center bg-gray-200 rounded-xl p-2 text-black drop-shadow-md font-bold w-fit mx-auto'>
            <h3 className="text-lg md:text-2xl lg:text-3xl">{service.name}</h3>
            <p className="text-sm md:text-base lg:text-lg">{service.description}</p>
          </div>
        </div>
      ))}
      <div className="pagination">
      </div>
      <div className="p-6  bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50 md:absolute -bottom-12 right-0 left-0 z-[3] justify-center items-center mx-auto md:w-2/3 md:rounded-2xl ">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-2xl tracking-tighter font-bold">Up to
              <br className="sm:hidden" /> 35% Off
            </h2>
            <div className="space-x-2 text-center py-2 lg:py-0">
              <span>Plus free shipping! Use code:</span>
              <span className="font-bold text-md">P-HERO</span>
            </div>
            <a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 border-gray-400 dark:border-gray-600">Show Rooms</a>
          </div>
        </div>
      </div>
    </div>
  );
}
