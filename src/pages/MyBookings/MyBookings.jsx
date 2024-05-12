// MyBookings.js
import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import axios from 'axios';
import Booked from './Booked';
import EmptyState from '../../components/EmptyState';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 5; // Number of bookings per page

    useEffect(() => {
        fetchBookings();
    }, [currentPage]); // Fetch bookings when currentPage changes

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/bookings?page=${currentPage}&limit=${bookingsPerPage}`);
            setBookings(response.data.bookings);
            setTotalBookings(response.data.totalBookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const changePage = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(totalBookings / bookingsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h1 className='mx-auto text-center md:m-5 m-2 md:text-3xl text-xl font-bold '>
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



            {bookings.length < 1 ? (
                    <EmptyState
                        message="No booked room was found !"
                        address="/rooms"
                        label="Book Now"
                    />
                ) : (
                  <div className='grid grid-cols-1 mx-auto justify-center'>
                  {bookings.map(booking => (
                      <Booked key={booking._id} data={booking} />
                  ))}
              </div>
                
            )}





           
            <div className="flex justify-center m-4">
                <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`mr-2 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg focus:outline-none ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                >
                    <GrLinkPrevious />
                </button>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => changePage(number)}
                        className={`mx-1 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg focus:outline-none ${
                            currentPage === number ? 'font-bold text-blue-500' : ''
                        }`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`ml-2 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg focus:outline-none ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                >
                    <GrLinkNext />
                </button>
            </div>
        </div>
    );
}

export default MyBookings;
