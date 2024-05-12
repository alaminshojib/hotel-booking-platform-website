import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from "../../providers/AuthProvider";

const RoomDetails = () => {
  const Navigate = useNavigate()
  const { id } = useParams();
  const [singleData, setSingleData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showBookingSummary, setShowBookingSummary] = useState(false); // State to control booking summary modal

  const { user } = useContext(AuthContext); // Get the authentication object from ReactFire

  const loadedRoom = useLoaderData();

  useEffect(() => {
    if (loadedRoom) {
      const signData = loadedRoom.find((item) => item._id == id);
      setSingleData(signData);
    }
  }, [loadedRoom, id]);

  const {
    images,
    name,
    description,
    price_per_night,
    room_size,
    availability,
    special_offers
  } = singleData || {};

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (images.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (images.length || 1) - 1 : prevIndex - 1
    );
  };

  const handleConfirmBooking = () => {
    setShowBookingSummary(true); // Display booking summary modal
  };

  const handleBookNow = async () => {
    if (availability === "Yes") {
      if (!user) {
        // Handle case where user is not authenticated
        return;
      }
      const userEmail = user.email;
      const userName = user.displayName;

      try {
        const response = await fetch(`http://localhost:5000/bookings?userEmail=${userEmail}&roomId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch existing bookings');
        }
        const existingBookings = await response.json();

        // Check if the user has already booked for this room
        if (existingBookings.length > 0) {
          Swal.fire('You have already booked this room.', '', 'warning');
          return;
        } else {
          setBookingLoading(true);
          const bookingData = {
            roomId: id,
            name: name,
            images: images,
            description: description,
            price_per_night: price_per_night,
            room_size: room_size,
            availability: availability,
            special_offers: special_offers,
            userEmail: userEmail,
            userName: userName,
            bookingDate: bookingDate,
          };
          const bookingResponse = await fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
          });
          if (!bookingResponse.ok) {
            throw new Error('Failed to create booking');
          }
          // Show success alert after booking
          Swal.fire('The booking was successful!', '', 'success');
        }
      } catch (error) {
        console.error('Error handling booking:', error);
        Swal.fire('You have already booked this room!', '', 'error');
      } finally {
        setBookingLoading(false);
        Navigate("/mybookings")
      }
    } else {
      Swal.fire('Room not available', '', 'error');
    }
  };

  return (
    <div>
      {/* Your existing JSX code */}
      <div>
        <div className="justify-center m-auto px-5 p-3 mb-3 min-h-screen items-center flex-col flex">
          <section className="lg:flex border rounded-lg shadow-lg">
            <div className='p-5 flex-col items-center my-auto w-96  justify-center mx-auto'>
              <div className="relative h-80 rounded-md  overflow-hidden ">
                <img
                  className="absolute w-full h-full object-cover justify-center mx-auto"
                  src={images && images.length > 0 ? images[currentImageIndex] : ''}
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

            <div className="flex flex-col flex-1 mx-auto drop-shadow-xl md:p-8 p-5">
              <div className="md:text-lg font-semibold my-2">
                <span>Price : ${price_per_night}</span>
              </div>
              <h3 className="mb-5 lg:text-xl text-md leading-snug font-bold">
                {name}
              </h3>
              <h4 className='mb-1 font-semibold text-md'>Room Size: <span className='font-normal'>{room_size}</span></h4>
              <h4 className='mb-1 font-semibold text-md'>Availability: <span className='font-normal'>{availability}</span></h4>
              <p className='my-1 font-semibold text-md max-w-md'>Description: <span className='font-normal'>{description}</span></p>
              {special_offers &&
                <p className='my-1 font-semibold text-md max-w-md'>Special Offers: <span className='font-normal'>{special_offers}</span></p>
              }

              <button
                onClick={handleConfirmBooking}
                disabled={availability !== "Yes" || bookingLoading}
                className='flex my-7 items-center justify-center w-full p-2 text-sm font-bold transition-colors duration-200 bg-blue-500 border rounded-lg gap-x-2 sm:w-auto mt-2 hover:bg-blue-600 text-white'
              >
                {bookingLoading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          </section>
          {/* Booking Summary Modal */}
          {showBookingSummary && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
                <p className="mb-4">Room: {name}</p>
                <p className="mb-4">Price per Night: ${price_per_night}</p>
                <p className="mb-4">Room Size: {room_size}</p>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Select Date:</label>
                  <DatePicker
                    selected={bookingDate}
                    onChange={date => setBookingDate(date)}
                    minDate={new Date()}
                    className="border-2 bg-white  rounded px-3 py-2"
                  />
                </div>
                {/* Add more details as needed */}
                <div className="flex justify-center gap-5 items-center mx-2">
                  <button
                    className="bg-green-500 btn-sm text-white px-4 rounded-lg"
                    onClick={handleBookNow}
                  >
                    Confirm Booking
                  </button>
                  <button
                    className="bg-red-500 text-white btn-sm px-4 rounded-lg "
                    onClick={() => setShowBookingSummary(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
