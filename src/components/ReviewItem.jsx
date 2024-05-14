import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Typewriter } from "react-simple-typewriter";

const ReviewItem = ({ review }) => {
  return (
    <div >
      <div className="border-2 container flex flex-col  max-w-lg mt-7 p-10 mx-auto divide-y rounded-lg ">
      <h1 className='mx-auto text-center md:m-5 m-2 md:text-3xl text-xl font-bold '>
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
      <p className='text-gray-500 pb-5 mx-auto justify-center text-center w-3/5'>Our success hinges on customer satisfaction.</p>
      
        
        <div className="flex justify-between p-4">
          <div className="flex space-x-4">
            <div>
              <img
                src={review.userImage}
                alt=""
                className="object-cover w-5 h-5 rounded-full"
              />
            </div>
            <div>
              <h4 className="font-bold">{review.userName}</h4>
              <span className="text-xs">Date: {review.bookingDate}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-700">
            <span className="text-xl font-bold">Rating: {review.average_rating}</span>
            <AiFillStar className="text-xl" />
          </div>
        </div>
        <div className="p-4 space-y-2 text-center text-sm">
          {review.reviews.slice(0, 2).map((reviewText, index) => (
            <p key={index}>{reviewText.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
