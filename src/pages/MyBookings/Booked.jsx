import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineReviews, MdDeleteForever, MdUpdate } from "react-icons/md";

const Booked = ({ data, setRooms }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
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
                throw new Error('Cannot cancel booking. It\'s less than one day before the booked date.');
            }

            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                setIsDeleting(true);
                const response = await fetch(`http://localhost:5000/bookings/${data._id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Failed to delete room item');
                }

                const responseData = await response.json();
                if (responseData.deletedCount > 0) {
                    Swal.fire(
                        'Deleted!',
                        'Your room item has been canceled!',
                        'success'
                    );
                   

                    // Filter out the deleted booking from the state
                    const remaining = data.filter(item => item._id !== roomId);
                    setRooms(remaining);
                }
            }
        } catch (error) {
            console.error('Error deleting room item:', error);
            // Show error message to the user
            Swal.fire(
                'Error!',
                error.message,
                'error'
            );
        } finally {
            setIsDeleting(false);
            navigate('/mybookings');
        }
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
                        <p className="text-orange-600 text-xs">
                            Book Date: <span className='font-bold'>{new Date(data.bookingDate).toLocaleDateString()}</span>
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
                        <div
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full flex justify-center items-center gap-1 cursor-pointer "
                            onClick={() => onClick(data.roomId)}
                        >
                            <MdUpdate /><p>Update </p>
                        </div>
                        <div
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full flex justify-center items-center gap-1 cursor-pointer "
                            onClick={() => onClick(data.roomId)}
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
