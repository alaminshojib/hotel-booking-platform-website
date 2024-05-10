import { Link } from "react-router-dom";


const CraftCard = ({ craft,index }) => {


    const {
        _id,
        image,
        item_name,
        subcategory_Name,
        price,
       
    } = craft;


    return (


        <>
            <tr className="w-6/6  justify-between border-b border-opacity-20 border-gray-700 dark:border-gray-300 ">


                <td className="w-1/6 items-center flex-col justify-center  text-center">
                <p>{index+1}</p>
                </td>
                <td className="w-1/6 items-center flex-col justify-center  text-center">
                    <img className="md:w-24 md:h-24 w-10 h-10 items-center flex-col justify-center m-auto rounded-md " src={image} alt="Item Image" />
                </td>
                <td className="w-1/6 items-center flex-col justify-center mx-auto text-center">
                    <p>{item_name}</p>
                </td>
                <td className="w-1/6 items-center  flex-col justify-center mx-auto text-center">
                    <p>{subcategory_Name}</p>
                </td>
                <td className="w-1/6 items-center flex-col justify-center mx-auto text-center">
                    <p>{price} TK</p>
                </td>
                <td className="w-1/6 items-center flex-col justify-center mx-auto text-center">
                    <div>
                        <Link to={`/CraftCardDetails/${_id}`} className="w-fit flex flex-wrap justify-between items-center gap-2 font-bold border-2 text-blue-700 hover:text-green-900 py-1 px-2 rounded-full text-sm ">View Details</Link>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default CraftCard;