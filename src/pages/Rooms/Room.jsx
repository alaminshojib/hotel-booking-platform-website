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
      <div className="grid grid-cols-3 divide-x-2 items-center my-5 shadow-md border mb-4 h-40 w-4/5 mx-auto justify-center rounded-lg">
        <div>
          <Link to={`/roomDetails/${room._id}`}>
            <div className="relative overflow-hidden h-44 mx-auto justify-center rounded-lg">
              <img
                className="object-cover h-40 w-full mx-auto justify-center rounded-lg"
                src={room.images[currentImageIndex]}
                alt={room.name}
              />
            </div>
          </Link>
        </div>
        <div>
          <div className="px-6 py-4 mx-auto justify-center w-2/3">
            <div className="font-bold text-xl mb-2">{room.name}</div>
            <p className="text-base text-green-600">
              Availability: <span className='font-bold'>{room.availability}</span>
            </p>
            <p className="text-orange-600 text-base">
              Total Reviews: <span className='font-bold'>{room.totalReviews}</span>
            </p>
          </div>
        </div>
        <div>
          <div className="flex flex-col w-fit space-y-1 mx-auto justify-center">
            <p className="text-orange-400 text-xl font-bold py-1 px-4 ">
              Price : ${room.price_per_night}
            </p>
           
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
              onClick={() => onClick(room._id)}
            >
              Review Now
            </button>
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default Room;
