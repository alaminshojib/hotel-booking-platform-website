// ReviewItem.js
import { CiStar } from "react-icons/ci";

const ReviewItem = ({ review }) => {
  return (
    <div className="w-full bg-slate-300">
    <div className="container flex flex-col w-full bg-slate-400 max-w-lg my-7 p-10 mx-auto divide-y rounded-lg ">
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          <div>
            <img
              src="https://source.unsplash.com/100x100/?portrait"
              alt=""
              className="object-cover w-5 h-5 rounded-full "
            />
          </div>
          <div>
            <h4 className="font-bold">{review.user}</h4>
            <span className="text-xs ">2 days ago</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-700">
          
          <span className="text-xl font-bold">Rating : {review.rating}</span>
          <CiStar className="text-xl"/>

        </div>
      </div>
      <div className="p-4 space-y-2 text-sm ">
        <p>{review.comment}</p>
      </div>
    </div>
    </div>
  );
};

export default ReviewItem;
