import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLoaderData } from "react-router-dom";
import MySingleCraftCard from "../../components/MySingleCraftCard";
import EmptyState from "../../components/EmptyState";
import { Typewriter } from "react-simple-typewriter";

const MyCraftList = () => {
    const { user } = useContext(AuthContext);
    const MyCrafts = useLoaderData();
    const [filteredCrafts, setFilteredCrafts] = useState([]);
    const [selectedCustomization, setSelectedCustomization] = useState('');

    useEffect(() => {
        if (MyCrafts && user && user.email) {
            let filtered = MyCrafts.filter(craft => craft.userEmail === user.email);

            if (selectedCustomization) {
                filtered = filtered.filter(craft => craft.customization === selectedCustomization);
            }

            setFilteredCrafts(filtered);
        }

    }, [MyCrafts, user, selectedCustomization]);

    const handleCustomizationChange = (e) => {
        setSelectedCustomization(e.target.value);
    };

    const craftsToRender = filteredCrafts.length >= 0 ? filteredCrafts : MyCrafts;

    return (
        <div>
            <div className="flex flex-col justify-center items-center pt-5 ">
                <h1 className="font-semibold text-xl lg:text-3xl p-3"><Typewriter
                    words={['My Art & Craft List']}
                    loop={0}
                    typeSpeed={150}
                    deleteSpeed={0}
                    delaySpeed={0}
                    cursor={null}
                    typeWriterSpan={props => <span {...props} className="inline-block" />} // Wrap each letter in a span for styling
                /> </h1>

                <fieldset className="space-y-1 text-gray-100 dark:text-gray-800 w-fit mx-auto">
                    <div className="flex">
                        <span className="flex items-center px-2 py-2 pointer-events-none text-xs rounded-l-md bg-gray-700 dark:bg-gray-300">Filter By Customization:</span>
                        <select name="customization" value={selectedCustomization} onChange={handleCustomizationChange} className="pl-2 flex flex-1 border sm:text-sm rounded-r-md focus:ring-inset border-gray-700 dark:border-gray-300 text-gray-100 dark:text-gray-800 bg-gray-800 dark:bg-gray-100 focus:ring-violet-400 focus:dark:ring-violet-600">
                            <option disabled value="">Select Customization</option>
                            <option value="">All</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </fieldset>
            </div>
            {!user ? (
                <div className="text-center text-gray-500 mt-4">
                    Loading...
                </div>
            ) : (
                craftsToRender.length < 1 ? (
                    <EmptyState
                        message="No Craft Items Found"
                        address="/addCraftItem"
                        label="Add Craft"
                    />
                ) : (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mx-auto p-10 ">
                        {craftsToRender.map(craft => (
                            <MySingleCraftCard
                                key={craft._id}
                                craft={craft}
                            ></MySingleCraftCard>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default MyCraftList;
