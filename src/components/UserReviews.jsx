import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { Typewriter } from 'react-simple-typewriter';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const autoPlayInterval = 2500; // Autoplay interval in milliseconds

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('https://hotel-booking-platform-server-side.vercel.app/services');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changePage = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage(current => (current === totalPages ? 1 : current + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [totalPages, autoPlayInterval]);

  return (
    <div className="mx-auto max-w-5xl my-2 md:my-5">
      <h1 className="text-center text-3xl font-bold mb-4">
        <Typewriter
          words={['Customer Reviews']}
          loop={0}
          typeSpeed={250}
          deleteSpeed={0}
          delaySpeed={0}
          cursor={null}
          typeWriterSpan={props => <span {...props} className="inline-block"/>}
        />
      </h1>
      <p className="text-center text-gray-500 pb-5">Our success hinges on customer satisfaction.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews
          .slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
          .map(review => (
            <ReviewItem key={review._id} review={review} />
          ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 border-2 border-gray-300 hover:border-cyan-700 py-2 px-4 rounded-lg focus:outline-none"
        >
          <GrLinkPrevious />
        </button>
        
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 border-2 border-gray-300 hover:border-cyan-700 py-2 px-4 rounded-lg focus:outline-none"
        >
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

export default UserReviews;
