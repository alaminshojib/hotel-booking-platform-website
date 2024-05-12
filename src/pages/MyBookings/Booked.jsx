// Booked.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const Booked = ({ data }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (data && data.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === data[0]?.images.length - 1 ? 0 : prevIndex + 1
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
            <h1
                className='mx-auto text-center md:m-5 m-2 md:text-3xl text-xl font-bold '
                data-aos="fade-down" // Apply fade-up animation to this element
            >
                <Typewriter
                    words={['My Booking List']}
                    loop={0}
                    typeSpeed={250}
                    deleteSpeed={0}
                    delaySpeed={0}
                    cursor={null}
                    typeWriterSpan={props => <span {...props} className="inline-block" />}
                />
            </h1>

            <p className='text-gray-500 pb-5 mx-auto justify-center text-center w-3/5'>Enjoy luxurious accommodations in our Executive Suite, featuring spacious living areas, stunning city views, and top-notch amenities for a truly indulgent stay..</p>

            {data && data.map(room => (
                <div class="grid grid-cols-3 divide-x-2 items-center my-5 shadow-md border mb-4 h-40 w-4/5 mx-auto justify-center rounded-lg">
                    <div><Link to={`/roomDetails/${room._id}`}><div className="relative overflow-hidden h-44  mx-auto justify-center rounded-lg">
                        <img
                            className=" object-cover h-40 w-full mx-auto justify-center rounded-lg"
                            src={room.images[currentImageIndex]}
                            alt={room.name}
                        />

                    </div></Link></div>
                    <div><div className="px-6 py-4  mx-auto justify-center w-2/3">
                        <div className="font-bold text-lg mb-1">{room.name}</div>

                       <p
                            className="text-orange-400  font-bold  "
                        >
                            Price : ${room.price_per_night}
                        </p>
                        <p className="text-green-600 text-xs ">
                            Special Offer: <span className='font-bold'>{room.special_offers}</span>
                        </p>
                        <p className="text-orange-600 text-xs ">
                            Total Reviews: <span className='font-bold'>{room.totalReviews}</span>
                        </p>
                    </div></div>
                    <div> <div className="flex flex-col w-fit space-y-1 mx-auto justify-center">
                        
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full"
                            onClick={() => onClick(room._id)}
                        >
                            Update Date       </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                            onClick={() => onClick(room._id)}
                        >
                            Review Now
                        </button>
                        <button
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded-full"
                            onClick={() => onClick(room._id)}
                        >
                            Cancel Booking
                        </button>

                    </div></div>
                </div>

            ))}
        </div>
    );
};

export default Booked;