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

    const [rating, setRating] = useState(null); // State to store the rating
    const [reviewError, setReviewError] = useState(null); // State to store review error message

    const [displayName, setDisplayName] = useState('');



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
                return;
            }

            setLoading(true); // Set loading to true when starting data fetching

            // Check if the booking date has changed
            const originalBookingDate = new Date(selectedRoom.bookingDate); // Assuming selectedRoom has a property bookingDate
            if (originalBookingDate.getTime() === bookingDate.getTime()) {
                // Dates are the same, show an alert and return
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

        } catch (error) {

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



    const handleSubmitReview = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            setShowReviewModal(true);


            // Validate rating range
            if (parseFloat(rating) < 0.1 || parseFloat(rating) > 5) {
                throw new Error('Rating must be a number between 0.1 and 5.1');
            }


            const response = await axios.post('https://hotel-booking-platform-server-side.vercel.app/reviews', {
                displayName: displayName || user.displayName, // Use user.displayName if displayName is empty
                rating: parseFloat(rating), // Parse rating as float
                reviewText: reviewText,
                roomId: data.roomId // Assuming roomId is available in the data object
            });

            if (response.data.success) {
                // Clear review text and rating
                setReviewText('');
                setRating(null); // Reset rating to null or ''

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
            setReviewError('You have already reviewed this room'); // Set review error message
        } finally {
            setLoading(false);
            setShowReviewModal(false); // Set loading to false after data fetching completes
        }
    };

    const handleReviewButtonClick = () => {
        if (user) {
            // If user is authenticated, show the review modal
            setShowReviewModal(true);
        }
    };

    return (
        <div>
            {reviewError && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Thanks for the interest</h2>
                        <p className="mb-4">{reviewError}</p>
                        <button
                            className="bg-blue-500 btn-sm text-white px-4 rounded-lg"
                            onClick={() => setReviewError(null)} // Clear the review error message
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showReviewModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg text-black shadow-lg max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                        <form onSubmit={handleSubmitReview}>
                            <div className="mb-4">
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name:</label>
                                <input
                                    id="displayName"
                                    type="text"
                                    value={user.displayName} // Assuming user object includes displayName
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="border bg-white border-gray-300 rounded p-2 mb-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
                                <input
                                    placeholder='Give Rating'
                                    id="rating"
                                    type="number"
                                    step="0.1" // Increment or decrement by 0.1
                                    value={rating || ''} // Ensure null is handled
                                    onChange={(e) => setRating(e.target.value)} // Ensure rating is parsed as integer
                                    className="border bg-white border-gray-300 rounded p-2 mb-2 w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">Review:</label>
                                <textarea
                                    id="reviewText"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your review here..."
                                    className="border bg-white border-gray-300 rounded p-2 mb-4 w-full h-40"
                                ></textarea>
                            </div>
                            <div className="flex justify-center gap-5 items-center">
                                <button
                                    type="submit"
                                    disabled={loading || !reviewText.trim()}
                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                                >
                                    {loading ? 'Submitting...' : 'Leave a Review'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowReviewModal(false)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
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


            {/* Update Booking Summary Modal */}
            {showBookingSummary && (
                <div className="fixed top-0 left-0 w-full text-black h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
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
            <div className="grid grid-cols-3 divide-x-2 items-center my-5 shadow-md border mb-2 h-40 lg:w-4/5 mx-auto justify-center rounded-lg hover:border-green-700 px-1 hover:bg-green-100 cursor-pointer" key={data._id}>
                <div>
                    <Link className='tooltip tooltip-accent' to={`/roomDetails/${data.roomId}`} data-tip={"View Details"}>
                    <div className="flex  h-16 md:h-20 lg:h-full  lg:w-72 w-full md:w-40 justify-center rounded-lg">
                            <img
                className="object-cover  flex w-20 md:w-36 md:h-28 lg:h-28 my-2 lg:w-64 h-16  items-center  mx-auto justify-center rounded-lg"
                src={data.images[currentImageIndex]}
                                alt={data.name}
                            />
                        </div>
                    </Link>
                </div>
                <Link to={`/roomDetails/${data.roomId}`}>
                    <div>
                        <div className=" py-1 lg:py-2 mx-auto justify-center lg:w-2/3">
                            <div className="font-bold text-xs mb-1">{data.name}</div>
                            <p className="text-orange-400 text-xs font-bold">
                                Price : ${data.price_per_night}
                            </p>


                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col justify-start w-fit gap-2 py-1 md:mx-auto md:justify-center">
                            <Link
                                className="bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 font-bol py-1  lg:px-4 rounded-lg"
                                onClick={() => handleUpdateDate(data._id, data)}
                            >
                                <div className='flex justify-center gap-1 items-center'><MdUpdate /><p>Update </p></div>
                            </Link>
                            <Link
                                className="bg-red-500 hover:bg-red-700 text-white font-bol px-2 py-1 text-xs  lg:px-4 rounded-lg"
                                onClick={() => handleDelete(data.roomId)}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Canceling...' : <div className='flex justify-center gap-1 items-center'><MdDeleteForever /><p>Cancel </p></div>}
                            </Link>
                        </div>
                </Link>
                <div>
                    <div className="flex flex-col w-fit space-y-1 mx-auto justify-center">
                        <p className="text-gray-600 text-xs text-md font-semibold text-center mb-2">
                            Booking Date: <span className='font-bold'>{new Date(data.bookingDate).toLocaleDateString()}</span>
                        </p>
                        <Link
                            className="bg-blue-500 hover:bg-blue-700 text-white  font-bol py-1  lg:px-4 rounded-lg"
                            onClick={handleReviewButtonClick}
                        >
                            <div className='flex justify-center gap-1 text-xs items-center'><MdOutlineReviews /><p>Leave a Review </p></div>
                        </Link>


                    </div>
                </div>
            </div>
        </div>

    );
};

export default Booked;


