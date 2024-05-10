

// UserReviews.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './userReviews.css';
import { Autoplay, Pagination } from 'swiper/modules';
import ReviewItem from './ReviewItem';

// Assuming you fetch reviews from an API
const reviews = [
  {
    id: 1,
    user: 'John Doe',
    comment: 'Great experience! The hotel staff was very friendly and helpful.',
    rating: 5,
  },
  {
    id: 2,
    user: 'Jane Smith',
    comment: 'Beautiful hotel with excellent amenities.',
    rating: 4,
  },
  // Add more reviews as needed
];


const UserReviews = () => {

  if (!reviews || reviews.length === 0) {
    return <div>No reviews available</div>;
  }

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewItem review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UserReviews;
