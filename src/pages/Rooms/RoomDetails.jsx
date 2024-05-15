import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../providers/AuthProvider";

const RoomDetails = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [singleData, setSingleData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false); // New state to track booking success
  const [bookingError, setBookingError] = useState(""); // New state to track booking error
  const [animation, setAnimation] = useState(false); // State to track if animation should be applied

  const { user } = useContext(AuthContext);

  const loadedRoom = useLoaderData();

  useEffect(() => {
    if (loadedRoom) {
      const signData = loadedRoom.find((item) => item._id == id);
      setSingleData(signData);
    }
  }, [loadedRoom, id]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("roomDetails");
      if (element) {
        const boundingClientRect = element.getBoundingClientRect();
        const top = boundingClientRect.top;
        if (top >= 0 && top <= window.innerHeight) {
          setAnimation(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    images,
    name,
    description,
    price_per_night,
    room_size,
    availability,
    special_offers,
  } = singleData || {};

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (images.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (images.length || 1) - 1 : prevIndex - 1
    );
  };

  const handleBookNow = async () => {
    // Booking logic remains the same
  };

  return (
    <div id="roomDetails" className={`room-details ${animation ? 'aos-animate' : ''}`}>
      <div>
        <div className="justify-center m-auto px-5 p-3 mb-3 min-h-screen  items-center flex-col flex">
          <section className="lg:flex border rounded-lg shadow-lg">
            <div className="p-5 flex-col items-center my-auto w-96  justify-center mx-auto">
              <div className="relative h-80 rounded-md  overflow-hidden ">
                <img
                  className="absolute w-full h-full object-cover justify-center mx-auto"
                  src={images && images.length > 0 ? images[currentImageIndex] : ""}
                  alt={name}
                />

                <button
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded"
                  onClick={prevImage}
                >
                  Prev
                </button>
                <button
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded"
                  onClick={nextImage}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="flex flex-col flex-1  drop-shadow-xl md:p-8 mx-5 p-5">
              <div className="md:text-lg font-semibold my-2">
                <span>Price : ${price_per_night}</span>
              </div>
              <h3 className="mb-5 lg:text-xl text-md leading-snug font-bold">{name}</h3>
              <h4 className="mb-1 font-semibold text-md">
                Room Size: <span className="font-normal">{room_size}</span>
              </h4>
              <h4 className="mb-1 font-semibold text-md">
                Availability: <span className="font-normal">{availability}</span>
              </h4>
              <p className="my-1 font-semibold text-md max-w-md">
                Description: <span className="font-normal">{description}</span>
              </p>
              {special_offers && (
                <p className="my-1 font-semibold text-md max-w-md">
                  Special Offers: <span className="font-normal">{special_offers}</span>
                </p>
              )}

              <div
                disabled={availability !== "Yes" || bookingLoading}
                onClick={() => setShowBookingSummary(true)} // Show booking summary on button click
                className="flex my-7 items-center justify-center w-fit cursor-pointer p-2 text-sm font-bold transition-colors duration-200 bg-blue-500 border rounded-lg gap-x-2 sm:w-auto mt-2 hover:bg-blue-600 text-white"
              >
                {bookingLoading ? "Booking..." : "Book Now"}
              </div>
            </div>
          </section>
          {showBookingSummary && (
            <div className="fixed top-0 left-0 w-full h-full text-black bg-gray-800 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
                {bookingError && <p className="text-red-500 mb-4">{bookingError}</p>}
                <p className="mb-4">Room: {name}</p>
                <p className="mb-4">Price per Night: ${price_per_night}</p>
                <p className="mb-4">Room Size: {room_size}</p>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Select Date:</label>
                  <DatePicker
                    selected={bookingDate}
                    onChange={(date) => setBookingDate(date)}
                    minDate={new Date()}
                    className="border-2 bg-white  rounded px-3 py-2"
                  />
                </div>
                <div className="flex justify-center gap-5 items-center mx-2">
                  <button
                    className="bg-green-500 btn-sm text-white px-4 rounded-lg"
                    onClick={handleBookNow}
                  >
                    Confirm Booking
                  </button>
                  <button
                    className="bg-red-500 text-white btn-sm px-4 rounded-lg"
                    onClick={() => setShowBookingSummary(false)} // Close booking summary on cancel
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {bookingSuccess && (
            <div className="fixed top-0 left-0 w-full h-full text-black bg-gray-800 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <h2 className="text-2xl font-bold text-green-500 mb-4">Booking Success</h2>
                <p className="mb-4">Your booking for {name} has been confirmed.</p>
                <button
                  className="bg-blue-500 btn-sm text-white px-4 rounded-lg"
                  onClick={() => {
                    setBookingSuccess(false);
                    Navigate("/mybookings"); // Navigate back to the previous page
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {bookingError && (
            <div className="fixed top-0 left-0 w-full text-black h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Sorry to Say</h2>
                <p className="mb-4">{bookingError}</p>
                <button
                  className="bg-blue-500 btn-sm text-white px-4 rounded-lg"
                  onClick={() => {
                    setBookingSuccess(false);
                    Navigate("/mybookings"); // Navigate back to the previous page
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
