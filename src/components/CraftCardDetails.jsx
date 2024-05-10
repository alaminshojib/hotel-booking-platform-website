import { Link, useParams, useNavigate, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

const CraftCardDetails = () => {
  const loadedCraft = useLoaderData();


  const navigate = useNavigate()

  const { id } = useParams();

  const [singleData, setSingleData] = useState();


  useEffect(() => {
    if (loadedCraft) {
      const signData = loadedCraft.find((item) => item._id == id);
      setSingleData(signData);
      console.log(signData)
    }
  }, [loadedCraft, id]);
  console.log(loadedCraft)

  const {
    image,
    item_name,
    subcategory_Name,
    short_description,
    price,
    rating,
    customization,
    processing_time,
    stockStatus,
    userEmail,
    userName
  } = singleData || {};

  console.log(item_name)

  return (
    <div>

      <div className=" justify-center m-auto  px-5  p-3 mb-3 min-h-screen items-center flex-col flex">
        <section className="lg:flex  border  rounded-lg shadow-lg">
          <div className=' p-5 flex-col items-center my-auto w-96'>
            <img alt="Image" className="object-cover w-full rounded-2xl mx-auto " src={image} />
          </div>

          <div className="flex flex-col flex-1 mx-auto drop-shadow-xl md:p-8 p-4">
            <div className=" md:text-lg  font-semibold my-2">
              <span>Price : {price} TK</span>

            </div>
            <h3 className=" mb-5 lg:text-xl text-md leading-snug font-bold">
              {item_name}
            </h3>
            <h4 className='mb-1 font-semibold text-md'> Category : <span className='font-normal'>{subcategory_Name} </span></h4>
            <h4 className='mb-1 font-semibold text-md'>Status : <span className='font-normal'>{stockStatus} </span></h4>
            <h4 className='mb-1 font-semibold text-md'>Processing Time : <span className="font-normal">{processing_time} Weeks </span></h4>
            <h4 className='my-1 font-semibold text-md'>Rating : <span className='font-normal'>{rating}</span></h4>
            <h4 className='my-1 font-semibold text-md'>Customization : <span className='font-normal'>{customization}</span></h4>
            <h4 className='my-1 font-semibold text-md'>Person Name : <span className='font-normal'>{userName}</span></h4>
            <h4 className='my-1 font-semibold text-md'>Person's Email : <span className='font-normal'>{userEmail}</span></h4>
            <p className='my-1 font-semibold text-md max-w-md'>Short Description : <span className='font-normal'>{short_description}</span></p>

            <div className='flex gap-5 justify-start items-center my-5'>
              <button
                onClick={() => navigate(-1 || '/')}
                className='flex my-7 items-center justify-center w-full p-1 md:p-2 text-sm font-bold transition-colors duration-200 bg-blue-500 border rounded-lg gap-x-2 sm:w-auto mt-2   hover:bg-blue-600 text-white'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='w-5 h-5 rtl:rotate-180 text-primary'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                  />
                </svg>

                <span>Go back</span>
              </button>
              <button
                onClick={() => navigate('/myCraftList')}
                className='flex my-7 items-center justify-center w-full p-1 md:p-2 text-sm font-bold transition-colors duration-200 bg-green-500 border rounded-lg gap-x-2 sm:w-auto mt-2   hover:bg-blue-600 text-white'
              >
                <span>My Craft list</span>
              </button>
            </div>
          </div>
        </section>

      </div>



    </div>
  );
};

export default CraftCardDetails;