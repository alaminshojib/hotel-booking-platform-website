import { Link } from "react-router-dom";

const CraftItemsSection = ({ craft }) => {
  const {
    _id,
    image,
    item_name,
    subcategory_Name,
    price,
    rating,
    processing_time,
    stockStatus,
  } = craft;

  return (
    <div className="drop-shadow-xl  ">
      <article className="flex flex-col border-3 rounded-3xl shadow-md lg:w-72  my-1 h-96 justify-center mx-auto border">
        <div>
          <img
            alt=""
            className="object-cover h-44 mx-auto w-full rounded-t-3xl bg-cover"
            src={image}
          />
        </div>

        <div className="flex flex-col flex-1 px-4 py-1">
          <div className="flex flex-wrap justify-between pt-3 space-x-2 text-lg font-medium">
            <span>Price : {price} TK</span>

            <Link
              to={`/CraftHomeCardDetails/${_id}`}
              className="flex flex-wrap justify-between items-center gap-2 bg-cyan-600 hover:bg-green-700 py-1 px-2 rounded-full text-sm text-white"
            >
              View Details
            </Link>
          </div>
          <h3 className=" py-2 lg:text-lg text-md  font-semibold">
            {item_name.slice(0, 30)}
          </h3>
          <h4 className='mb-1 font-semibold text-md'> Category : <span className='font-normal'>{subcategory_Name} </span></h4>
          <h4 className='mb-1 font-semibold text-md'>Status : <span className='font-normal'>{stockStatus} </span></h4>
          <h4 className='my-1 font-semibold text-md'>Rating : <span className='font-normal'>{rating}</span></h4>
          <h4 className='mb-1 font-semibold text-md'>Processing Time : <span className="font-normal">{processing_time} Weeks </span></h4>
        </div>
      </article>
    </div>
  );
};

export default CraftItemsSection;
