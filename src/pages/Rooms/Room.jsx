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
      <div className="hover:border-green-700 px-1 hover:bg-green-100 cursor-pointer grid grid-cols-3 divide-x-2 items-center my-3 shadow-md border mb-2 h-40 lg:w-4/5 mx-auto justify-center rounded-lg">
        <div>
          <Link className='tooltip tooltip-accent' to={`/roomDetails/${room._id}`} data-tip={"View Details"}>
            <div className="relative h-28 lg:h-36 lg:w-72 w-40 mx-auto justify-center rounded-lg">
              <img
                className="object-cover  w-full h-full flex mx-auto justify-center rounded-lg"
                src={room.images[currentImageIndex]} // Update to use current image index
                alt={room.name}
              />
            </div>
          </Link>
        </div>
        <div>
          <Link to={`/roomDetails/${room._id}`}>
            <div className="lg:px-6 px-2 py-2 mx-auto justify-center lg:w-2/3">
              <div className="font-bold lg:text-lg mb-2">{room.name}</div>
              <p className="text-green-600">
                Availability: <span className='font-bold'>{room.availability}</span>
              </p>
              
            </div>
          </Link>
        </div>
        <div>
          <div className="flex flex-col w-fit space-y-1 mx-auto justify-center">
            <p className="text-orange-400 text-sm lg:text-xl font-bold py-1 px-4 ">
              Price : ${room.price_per_night}
            </p>
            <p className="text-orange-600 py-1">
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
