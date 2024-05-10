
// Import Swiper styles

import './slider.css'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Define array of 
const subcategories = [
  {
    title: "Landscape Painting",
    description: "Capture the beauty of nature.",
    backgroundImage: "https://i.ibb.co/dtmYKpJ/Landscape-Painting.jpg"
  },
  {
    title: "Portrait Drawing",
    description: "Express emotions through detailed portraits.",
    backgroundImage: "https://i.ibb.co/58s3j79/Portrait-Drawing.png"
  },
  {
    title: "Watercolour Painting",
    description: "Let colors blend in mesmerizing watercolor compositions.",
    backgroundImage: "https://i.ibb.co/gZGCdKh/Watercolour-Painting.png"
  },
  {
    title: "Oil Painting",
    description: "Create rich textures and depth with vibrant oil colors.",
    backgroundImage: "https://i.ibb.co/2W9YF8P/oil-painting.jpg"
  },
  {
    title: "Charcoal Sketching",
    description: "Explore light and shadow with expressive charcoal sketches.",
    backgroundImage: "https://i.ibb.co/4dz6ZH5/Charcoal-Sketching.png"
  },
  {
    title: "Cartoon Drawing",
    description: "Bring imaginative characters to life with playful cartoons.",
    backgroundImage: "https://i.ibb.co/6XsScn1/Cartoon-Drawing.png"
  }
];

export default function Banner() {
  return (
    <div className='w-full'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {subcategories.map((subcategory, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content bg-no-repeat bg-cover max-h-svh object-center bg-center" style={{ backgroundImage: `url(${subcategory.backgroundImage})`, minHeight: "400px" }}>
              <div className='absolute bottom-8 left-0 right-0 text-center bg-gray-200 rounded-xl p-2 text-black drop-shadow-md font-bold w-fit mx-auto'>
                <h3 className=" text-lg md:text-2xl lg:text-3xl">{subcategory.title}</h3>
                <p className=" text-sm md:text-base lg:text-lg">{subcategory.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}


      </Swiper>

      <div className="p-6 py-12 bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50  md:absolute bottom-6 right-0 left-0 z-[3] justify-center items-center mx-auto md:w-2/3 md:rounded-2xl ">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-6xl tracking-tighter font-bold">Up to
              <br className="sm:hidden" /> 35% Off
            </h2>
            <div className="space-x-2 text-center py-2 lg:py-0">
              <span>Plus free shipping! Use code:</span>
              <span className="font-bold text-lg">MAMBA</span>
            </div>
            <a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 border-gray-400 dark:border-gray-600">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}
