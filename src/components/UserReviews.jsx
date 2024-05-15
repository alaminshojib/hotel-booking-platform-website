import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem';
import { Typewriter } from 'react-simple-typewriter';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://hotel-booking-platform-server-side.vercel.app/reviews');
      // Sort reviews in descending order based on timestamp
      const sortedReviews = response.data.sort((a, b) => b.timestamp - a.timestamp);
      setReviews(sortedReviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      window.location.reload();
    }
  };



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
          typeWriterSpan={props => <span {...props} className="inline-block" />}
        />
      </h1>
      <p className="text-center text-gray-500 pb-5">Our success hinges on customer satisfaction.</p>

      <div className="relative">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-none"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="flex-none" style={{ minWidth: '33.333%', paddingRight: '10px', scrollSnapAlign: 'start' }}>
              <ReviewItem review={review} />
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default UserReviews;
