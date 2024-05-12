// Booked.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const Booked = ({ data }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (data && data.images && data.images.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
                );
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [data]);

    const onClick = (roomId) => {
        console.log("Clicked on room:", roomId);
        // Implement booking or review functionality here
    };

    return (
        <div>
           
            <div className="grid grid-cols-3 divide-x-2 items-center my-5 shadow-md border mb-4 h-40 w-4/5 mx-auto justify-center rounded-lg" key={data._id}>
                <div>
                    <Link to={`/roomDetails/${data.roomId}`}>
                        <div className="relative overflow-hidden h-44 mx-auto justify-center rounded-lg">
                            <img
                                className="object-cover h-40 w-full mx-auto justify-center rounded-lg"
                                src={data.images[currentImageIndex]}
                                alt={data.name}
                            />
                        </div>
                    </Link>
                </div>
                <div>
                    <div className="px-6 py-4 mx-auto justify-center w-2/3">
                        <div className="font-bold text-lg mb-1">{data.name}</div>
                        <p className="text-orange-400 font-bold">
                            Price : ${data.price_per_night}
                        </p>
                        <p className="text-green-600 text-xs">
                            Special Offer: <span className='font-bold'>{data.special_offers}</span>
                        </p>
                        <p className="text-orange-600 text-xs">
                            Total Reviews: <span className='font-bold'>{data.totalReviews}</span>
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col w-fit space-y-1 mx-auto justify-center">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full"
                            onClick={() => onClick(data.roomId)}
                        >
                            Update Date
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                            onClick={() => onClick(data.roomId)}
                        >
                            Review Now
                        </button>
                        <button
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded-full"
                            onClick={() => onClick(data.roomId)}
                        >
                            Cancel Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booked;
