import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Room = ({ room, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [room.images.length]);

  return (
    <div>
      <div className="hover:border-green-700 px-1  cursor-pointer grid grid-cols-3 divide-x-2 items-center my-3 shadow-md border-2 mb-2  lg:w-4/5 mx-auto justify-center rounded-lg">
          <Link className='tooltip tooltip-accent' to={`/roomDetails/${room._id}`} data-tip={"View Details"}>
            <div className="flex  h-16 md:h-20 lg:h-full  lg:w-72 w-full md:w-40 justify-center rounded-lg">
              <img
                className="object-cover  flex w-20 md:w-36 md:h-28 lg:h-28 my-2 lg:w-64 h-16  items-center  mx-auto justify-center rounded-lg"
                src={room.images[currentImageIndex]} // Update to use current image index
                alt={room.name}
              />
            </div>
          </Link>
        <div>
          <Link to={`/roomDetails/${room._id}`}>
            <div className="lg:px-6 px-2 py-2 mx-auto justify-center lg:w-2/3">
              <div className="font-bold text-sm lg:text-lg mb-2">{room.name}</div>
              <p className="text-green-600 text-xs">
                Availability: <span className='font-bold'>{room.availability}</span>
              </p>
              
            </div>
          </Link>
        </div>
        <div>
          <div className=" w-fit space-y-1 mx-auto mb-2 text-center justify-center">
            <p className="text-orange-400 text-xs lg:text-xl font-bold my-1 ">
              Price : ${room.price_per_night}
            </p>
            <p className="text-orange-600 text-xs py-1">
                Total Reviews: <span className='font-bold'>{room.reviews ? room.reviews.length : 0}</span> {/* Check if room.reviews is defined */}
              </p>
            <Link
              className="bg-blue-500 text-xs md:text-sm w-fit mx-auto flex hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
              onClick={() => onClick(room._id)}
            >
              Review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
