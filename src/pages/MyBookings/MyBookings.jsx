import React, { useContext, useEffect, useState } from "react";
import EmptyState from '../../components/EmptyState';
import { Typewriter } from "react-simple-typewriter";
import { AuthContext } from "../../providers/AuthProvider";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Booked from './Booked';
import axios from 'axios';

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelRequest = false; // Flag to cancel pending requests on unmount or user state change
    
        const fetchData = async () => {
            if (!user || cancelRequest) return; // Bail out if no user or component is unmounted
    
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('https://hotel-booking-platform-server-side.vercel.app/bookings', {
                    withCredentials: true,
                    params: {
                        email: user.email
                    }
                });
                if (!cancelRequest) { // Check if component is still mounted before updating state
                    setFilteredRooms(response.data.bookings);
                    setLoading(false);
                }
            } catch (error) {
                if (!cancelRequest) {
                    setLoading(false);
                    setError("Error fetching data");
                }
            }
        };
    
        fetchData(); // Initial data fetch
    
        // Cleanup function to cancel pending requests on unmount or user state change
        return () => {
            cancelRequest = true; // Set flag to true when component is unmounted or user state changes
        };
    }, [user]);
    
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredRooms.slice(indexOfFirstBooking, indexOfLastBooking);

    return (
        <div>
            {loading ? (
                <div className="text-center text-gray-500 m-10"><span className="loading loading-dots loading-lg"></span>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 mt-4"> <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <React.Fragment>
                    <div className="flex flex-col justify-center items-center pt-5 ">
                        <h1 className='mx-auto text-center md:m-5 m-2 md:text-xl text-md font-bold '>
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
                    </div>


                    <p className='text-gray-500 pb-5 mx-auto justify-center text-sm text-center w-3/5'>Enjoy your cozy rooms, stylish apartments, and serene cottages.</p>

                    {currentBookings.length < 1 ? (
                        <EmptyState
                            message="No booked room was found !"
                            address="/rooms"
                            label="Book Now"
                        />
                    ) : (
                        <div className='grid grid-cols-1 mx-auto justify-center'>
                            {currentBookings.map(booking => (
                                <Booked key={booking._id} data={booking} />
                            ))}
                        </div>
                    )}
                    <div className="flex justify-center m-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`mr-2 border-2 hover:border-cyan-700 py-2 px-4 rounded-lg focus:outline-none ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                        >
                            <GrLinkPrevious />
                        </button>
                        {filteredRooms.length > 0 &&
                            Array.from({ length: Math.ceil(filteredRooms.length / bookingsPerPage) }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`mx-1 py-2 px-4 rounded-lg focus:outline-none ${currentPage === i + 1 ? 'font-bold text-blue-500' : ''
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredRooms.length / bookingsPerPage)}
                            className={`ml-2 border-2 hover:border-cyan-700 py-2 px-4 rounded-lg focus:outline-none ${currentPage === Math.ceil(filteredRooms.length / bookingsPerPage) ? 'cursor-not-allowed' : ''
                                }`}
                        >
                            <GrLinkNext />
                        </button>
                    </div>
                </React.Fragment>
            )}
           
        </div>
    );
};

export default MyBookings;
