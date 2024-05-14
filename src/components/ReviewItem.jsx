import React from "react";
import { AiFillStar } from "react-icons/ai";

const ReviewItem = ({ review }) => {
  return (
    <div >

      <div className="border-2 container flex flex-col min-h-80  max-w-lg mt-7 p-10 mx-auto divide-y space-y-3 rounded-lg ">

        <div className="w-full">
          <div className="mx-auto  justify-between ">
            <div className="mx-auto flex  justify-center mb-3">
              <img
                src={review.userImage}
                alt=""
                className="object-cover w-16 h-16 rounded-full"
              />
            </div>
            <div className="flex justify-between  space-x-4">

              <div>
                <h4 className="font-bold text-sm">{review.userName}</h4>
                <span className="text-xs">Date: {review.bookingDate}</span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-700">
                <span className="text-xs font-bold">Rating: {review.average_rating}</span>
                <AiFillStar className="text-sm" />
              </div>
            </div>

          </div>
        </div>
        <div className="p-4 space-y-2 text-center text-sm">
          {review.reviews.slice(0, 1).map((reviewText, index) => (
            <p key={index}>{reviewText.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
