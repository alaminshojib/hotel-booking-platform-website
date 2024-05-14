import React, { useEffect, useState } from 'react';
import './userReviews.css';
import ReviewItem from './ReviewItem';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 1;
  const autoPlayInterval = 2500; // Autoplay interval in milliseconds


  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    // Simulated fetch request to API endpoint
    // Replace with actual API call
    const response = await fetch('https://hotel-booking-platform-server-side.vercel.app/services');
    const data = await response.json();
    setReviews(data);
  };

  const changePage = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage(current => (current === totalPages ? 1 : current + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [totalPages, autoPlayInterval]);





  
  return (
    <div>
      {reviews
        .slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
        .map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
      <div className="flex justify-center m-4">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 border-2 hover:border-cyan-700 py-2 px-4 rounded-lg focus:outline-none"
        >
          <GrLinkPrevious />
        </button>
        
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 border-2 hover:border-cyan-700 py-2 px-4 rounded-lg focus:outline-none"
        >
          <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

export default UserReviews;
