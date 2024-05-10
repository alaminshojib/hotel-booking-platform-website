import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import Swal from 'sweetalert2';

const UpdateCraftDetails = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [formData, setFormData] = useState({
        image: '',
        item_name: '',
        subcategory_Name: '',
        short_description: '',
        price: '',
        rating: '',
        customization: '',
        processing_time: '',
        stockStatus: '',
        userEmail: '',
        userName: '',
    });

    useEffect(() => {
        // Fetch craft details based on ID and populate the form
        const fetchData = async () => {
            try {
                const response = await fetch(`https://art-craft-store-server-delta.vercel.app/artCrafts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch craft details');
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching craft details:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch craft details. Please try again later.',
                });
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateCraft = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://art-craft-store-server-delta.vercel.app/artCrafts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update craft');
            }

            const data = await response.json();
            console.log(data);

            if (response.status === 200) {
                navigate('/myCraftList');
                Swal.fire({
                    title: 'Success!',
                    text: 'Craft Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Done',
                });
               

            }
        } catch (error) {
            console.error('Error updating craft:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update craft. Please try again later.',
            });
        }
    };


    return (
        <div className='py-5'>
            <h2 className="lg:text-3xl text-xl font-semibold text-center p-5 "> <Typewriter

                                words={['Update Art & Craft Item :']}
                                loop={0}
                                typeSpeed={150}
                                deleteSpeed={0}
                                delaySpeed={0}
                                cursor={null} // Disable cursor for smoother typing effect
                                typeWriterSpan={props => <span {...props} className="inline-block" />} // Wrap each letter in a span for styling
                            /></h2>
            <form onSubmit={handleUpdateCraft}>
                <div className='grid lg:grid-cols-2 grid-cols-1 justify-center items-center  gap-5 md:w-2/3 w-11/12 mx-auto'>
                    <div>
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">Item Name:</span>
                                <input type="text" name="item_name" value={formData.item_name} onChange={handleChange} required id="url" placeholder="Item Name" className=" pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600" />
                            </div>
                        </fieldset>

                    </div>
                    <div >
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">Image URL:</span>
                                <input type="text" name="image" value={formData.image} onChange={handleChange} required id="url" placeholder="https://ibb.co/kMDQGxC" className=" pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600" />
                            </div>
                        </fieldset>

                    </div>

                    <div>
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">Subcategory Name:</span>
                                <select
                                    name="subcategory_Name"
                                    value={formData.subcategory_Name}
                                    onChange={handleChange}
                                    required
                                    className="pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600"
                                >
                                    <option disabled value="">Select Subcategory</option>
                                    {[
                                        "Landscape Painting",
                                        "Portrait Drawing",
                                        "Watercolour Painting",
                                        "Oil Painting",
                                        "Charcoal Sketching",
                                        "Cartoon Drawing"
                                    ].map((subcategory) => (
                                        <option key={subcategory} value={subcategory}>
                                            {subcategory}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>

                    </div>
                    <div >
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center border px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300 ">Short Description:</span>
                                <input name="short_description" value={formData.short_description} onChange={handleChange} required id="url" placeholder="Short Description" className=" pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600" />
                            </div>
                        </fieldset>

                    </div>
                    <div>
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">Price:</span>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} required id="url" placeholder="Price" className=" pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600" />
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">Rating:</span>
                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    required
                                    id="url"
                                    placeholder="Rating"
                                    className="pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                />
                            </div>
                        </fieldset>

                    </div>
                    <div>
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">Customization:</span>
                                <select
                                    name="customization"
                                    value={formData.customization}
                                    onChange={handleChange}
                                    required
                                    className="pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600"
                                >
                                    <option disabled value="">Select Customization Option</option>
                                    <option value="Yes">Yes </option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </fieldset>

                    </div>
                    <div>
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">Processing Time:</span>
                                <input type="number" name="processing_time" value={formData.processing_time} onChange={handleChange} required id="url" placeholder="Processing Time" className=" pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600" />
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">Stock Status:</span>
                                <select
                                    name="stockStatus"
                                    value={formData.stockStatus}
                                    onChange={handleChange}
                                    required
                                    className="pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600"
                                >
                                    <option disabled value="">Select Stock Status</option>
                                    <option value="In Stock">In Stock</option>
                                    <option value="Made to Order">Made to Order</option>
                                </select>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">User Name:</span>

                                <input type="text" disabled name="userName" value={formData.userName} onChange={handleChange} required id="url" placeholder="User Name" className=" pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600" />
                            </div>
                        </fieldset>

                    </div>
                    <div>
                        <fieldset className="w-full space-y-1 text-gray-100 dark:text-gray-800">
                            <div className="flex">
                                <span className="flex items-center px-3 py-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 dark:bg-gray-300">Email:</span>

                                <input type="email" disabled name="userEmail" value={formData.userEmail} onChange={handleChange} required id="url" placeholder="Email" className=" pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600" />
                            </div>
                        </fieldset>

                    </div>

                </div>
                <button className='btn-sm py-5 m-5 items-center font-semibold btn px-10 mx-auto justify-center flex flex-col btn-success text-white' type="submit">Update</button>

            </form>
        </div>
    );
};



export default UpdateCraftDetails;


