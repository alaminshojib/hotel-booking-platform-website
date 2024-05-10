import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ScrollableCard = () => {
  const [craftData, setCraftData] = useState([]);

  useEffect(() => {
    AOS.init(); // Initialize AOS
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://art-craft-store-server-delta.vercel.app/artCrafts');
      const jsonData = await response.json();
      setCraftData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const limitedCraftData = craftData.slice(0, 6);

  return (
    <div className='mt-8 px-5'>
      <h1
        className='mx-auto flex flex-col justify-center items-center md:m-5 m-2 md:text-3xl text-xl font-bold  w-fit rounded-lg p-1'
        data-aos="fade-up" // Apply fade-up animation to this element
      >
        <Typewriter
          words={['Welcome to Painting and Drawing']}
          loop={0}
          typeSpeed={250}
          deleteSpeed={0}
          delaySpeed={0}
          cursor={null}
          typeWriterSpan={props => <span {...props} className="inline-block"/>}
        />
      </h1>
      <div className="grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 justify-center items-center gap-2 mt-8 ">
        {limitedCraftData.map((craftItem, index) => (
          <div
            key={index}
            className=" rounded-lg overflow-hidden shadow-lg border"
            data-aos="fade-up" 
          >
            <img src={craftItem.image} alt="Image" className="object-cover object-center w-full h-28" />
            <div className="p-2">
              <h2 className="text-normal font-semibold mb-2">{craftItem.item_name && craftItem.item_name.slice(0, 21)}</h2>
              <p className='text-xs font-semibold'>Category: <span className='font-normal'>{craftItem.subcategory_Name}</span></p>
              <p className="text-xs font-semibold">Price: <span className='font-normal'>{craftItem.price} TK</span></p>
              <p className='text-xs font-semibold'>Customization: <span className='font-normal'>{craftItem.customization}</span></p>
              <p className='text-xs font-semibold'>Status: <span className='font-normal'>{craftItem.stockStatus}</span></p>
            </div>
            <div className='p-2'>
              <Link to={`/CraftCardDetails/${craftItem._id}`}>
                <button
                  type="button"
                  className="btn-sm w-full bg-blue-500 text-gray-900 dark:text-gray-50 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-violet-500"
                  data-aos="fade-up" 
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link
        to={`/allCraftItems`}
        className='text-blue-600 shadow-md hover:bg-blue-600 hover:text-white  rounded-2xl mx-auto flex flex-col justify-center items-center m-5  text-lg font-medium  w-fit px-4 py-1 '
        data-aos="fade-up" 
      >
        See More
      </Link>
    </div>
  );
};

export default ScrollableCard;
