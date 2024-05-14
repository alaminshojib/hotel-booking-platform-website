import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineReviews, MdDeleteForever, MdUpdate } from "react-icons/md";
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';


const Booked = ({ data, setRooms }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [deletedSuccess, setDeletedSuccess] = useState(false);
    const [showBookingSummary, setShowBookingSummary] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [reviewText, setReviewText] = useState('');
    const [showReviewModal, setShowReviewModal] = useState(false); // State to control review modal visibility



    const handleDelete = async (roomId) => {
        try {
            const bookedDate = new Date(data.bookingDate); // Assuming data.bookingDate is the booking date
            const currentDate = new Date();

            // Calculate the difference in milliseconds between current date and booked date
            const differenceInTime = bookedDate.getTime() - currentDate.getTime();

            // Calculate the difference in days
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);

            // Check if it's one day before the booked date
            if (differenceInDays <= 1) {
                throw new Error("It's less than one day before the booked date.");
            }

            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })

            if (result.isConfirmed) {
                setIsDeleting(true);
                const response = await fetch(`https://hotel-booking-platform-server-side.vercel.app/bookings/${data._id}`, {
                    method: 'DELETE'
                });
                navigate(0); // Navigate back to the previous page

                if (!response.ok) {
                    throw new Error('Failed to delete room item');
                }

                const responseData = await response.json();
                if (responseData.deletedCount > 0) {
                    // Filter out the deleted booking from the state
                    const remaining = data.filter(item => item._id !== roomId);
                    setRooms(remaining);

                    // Show success message to the user
                    setDeletedSuccess(true); // Set deletedSuccess to true
                    setTimeout(() => setDeletedSuccess(false), 2000); // Close the success message after 2 seconds

                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Your booking has been deleted.',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            }

        } catch (error) {
            console.error('Error deleting room item:', error);
            // Show error message to the user
            Swal.fire(
                'Sorry to Say!',
                error.message,
                'info'
            );
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpdateDate = (roomId, roomDetails) => {
        setSelectedRoom({ ...roomDetails, _id: roomId });
        setShowBookingSummary(true);
    };


    const handleConfirmUpdate = async () => {
        try {
            if (!selectedRoom || !bookingDate) {
                console.error("Selected room or date is missing.");
                return;
            }

            setLoading(true); // Set loading to true when starting data fetching

            // Check if the booking date has changed
            const originalBookingDate = new Date(selectedRoom.bookingDate); // Assuming selectedRoom has a property bookingDate
            if (originalBookingDate.getTime() === bookingDate.getTime()) {
                // Dates are the same, show an alert and return
                console.log("Booking date remains the same.");
                Swal.fire({
                    icon: 'info',
                    title: 'No Changes Detected',
                    text: 'The booking date remains the same.',
                });
                return;
            }

            // Perform the update action here
            const response = await fetch(`https://hotel-booking-platform-server-side.vercel.app/bookings/${selectedRoom._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookingDate: bookingDate.toISOString() // Convert date to ISO string format
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update booking');
            }

            // Close the modal
            setShowBookingSummary(false);

            // Show success notification
            Swal.fire({
                icon: 'success',
                title: 'Update Successful',
                text: 'Your booking has been updated successfully!',
            }).then(() => {
                // Reload the page
                navigate(0);
            });

            // Optionally, you can update the UI or reload the bookings here
            console.log("Booking date updated successfully");

        } catch (error) {
            console.error("Error confirming update:", error);

            // Show error notification
            Swal.fire({
                icon: 'error',
                title: 'Update Error',
                text: 'Failed to update booking. Please try again later.',
            })
        } finally {
            setLoading(false); // Set loading to false after data fetching completes
        }
    };


    const handleSubmitReview = async () => {
        try {
            const response = await axios.post('https://hotel-booking-platform-server-side.vercel.app/reviews', {
                roomId: data.roomId,
                reviewText: reviewText
            });

            if (response.data.success) {
                // Clear review text
                setReviewText('');

                // Show success notification
                Swal.fire({
                    icon: 'success',
                    title: 'Review Submitted',
                    text: 'Your review has been submitted successfully!',
                });
            } else {

                throw new Error(response.data.message || 'Failed to submit review.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            // Show error notification
            Swal.fire({
                icon: 'info',
                title: 'Thanks for try again',
                text: 'You have already reviewd this room',
            });
        } finally {
            setLoading(false);
            setShowReviewModal(false);
        }
    };


    const handleReviewButtonClick = () => {
        if (user) {
            // If user is authenticated, show the review modal
            setShowReviewModal(true);
        } else {
            // If user is not authenticated, redirect to login page
            navigate('/login');
        }
    };

    return (
        <div>
            {showReviewModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg text-black shadow-lg max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                        <textarea

                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here..."
                            className="border bg-white border-gray-300 rounded p-2 mb-4 w-full h-40"
                        ></textarea>
                        <div className="flex justify-center gap-5 items-center">
                            <button
                                onClick={handleSubmitReview}
                                disabled={loading || !reviewText.trim()}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                {loading ? 'Submitting...' : 'Submit Review'}
                            </button>
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deletedSuccess && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Deleted Successfully</h2>
                        <p className="mb-4">Your booking for {selectedRoom.name} has been confirmed.</p>
                        <button
                            className="bg-blue-500 btn-sm text-white px-4 rounded-lg"
                            onClick={() => {
                                setDeletedSuccess(false); // Set deletedSuccess to false
                                navigate(-1); // Navigate back to the previous page
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {loading && <span className="loading loading-bars loading-lg mx-auto justify-center items-center flex flex-col"></span>
            }
            {/* Update Booking Summary Modal */}
            {showBookingSummary && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Update Booking</h2>
                        <p className="mb-4">Room: {selectedRoom.name}</p>
                        <p className="mb-4">Price per Night: ${selectedRoom.price_per_night}</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Select New Date:</label>
                            <DatePicker
                                required
                                placeholderText='Month/Day/Year'
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
                                onClick={handleConfirmUpdate}
                            >
                                Confirm Update
                            </button>
                            <button
                                className="bg-red-500 text-white btn-sm px-4 rounded-lg"
                                onClick={() => setShowBookingSummary(false)}
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <div className="grid grid-cols-3 divide-x-2 items-center my-5 shadow-md border mb-2 h-40 w-4/5 mx-auto justify-center rounded-lg hover:border-green-700 px-1 hover:bg-green-100 cursor-pointer" key={data._id}>
                <div>
                    <Link className='tooltip tooltip-accent' to={`/roomDetails/${data.roomId}`} data-tip={"View Details"}>
                        <div className="relative overflow-hidden h-36 mx-auto justify-center rounded-lg">
                            <img
                                className="object-cover h-36 w-full mx-auto justify-center rounded-lg"
                                src={data.images[currentImageIndex]}
                                alt={data.name}
                            />
                        </div>
                    </Link>
                </div>
                <Link to={`/roomDetails/${data.roomId}`}>
                    <div>
                        <div className="px-6 py-2 mx-auto justify-center w-2/3">
                            <div className="font-bold text-sm mb-1">{data.name}</div>
                            <p className="text-orange-400 font-bold">
                                Price : ${data.price_per_night}
                            </p>
                            <p className="text-gray-600 text-xs">
                                Room size: <span className='font-bold'>{data.room_size}</span>
                            </p>
                            <p className="text-gray-600 text-xs">
                                Book Date: <span className='font-bold'>{new Date(data.bookingDate).toLocaleDateString()}</span>
                            </p>
                            <p className="text-green-600 text-xs">
                                Special Offer: <span className='font-bold'>{data.special_offers || "No offer available"}</span>
                            </p>

                        </div>
                    </div></Link>
                <div>
                    <div className="flex flex-col w-fit space-y-1 mx-auto justify-center">
                        <div
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full flex justify-center items-center gap-1 cursor-pointer "
                            onClick={() => handleUpdateDate(data._id, data)}
                        >
                            <MdUpdate /><p>Update </p>
                        </div>
                        <div
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full flex justify-center items-center gap-1 cursor-pointer "
                            onClick={handleReviewButtonClick}
                        >
                            <MdOutlineReviews /><p>Review </p>
                        </div>
                        <div
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded-full flex justify-center items-center gap-1 cursor-pointer "
                            onClick={() => handleDelete(data.roomId)}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : <><MdDeleteForever /><p>Cancel </p></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booked;
