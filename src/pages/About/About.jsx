import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <section>
                <div className='h-96 bg-gray-300'>
                    <div className='h-full flex flex-col m-auto justify-center text-center items-center border'>
                        <h1 className='text-center font-semibold text-4xl'>About Us</h1>
                        <div className='flex font-medium text-2xl mt-3 gap-2'><Link to={"/"} className='cursor-pointer hover:text-blue-700'>Home</Link><h2>|</h2><Link to={"/rooms"} className='cursor-pointer hover:text-blue-700'>Rooms</Link></div>
                    </div>
                </div>

                <section>

                <h1 className="text-3xl font-bold mx-auto text-center py-8">EXPLORE THE ROOMS THROUGH BEAUTIFUL VIDEOS.</h1>

                    <div className="hero ">
                        
                        <div className="hero-content flex-col lg:flex-row justify-center mx-auto w-full">
                            
                            <div className='w-1/2'>
                                <iframe className='mx-auto justify-center rounded-md' width="500" height="300" src="https://www.youtube.com/embed/zumJJUL_ruM" title="Beautiful Interior Details | Luxury Home Tour" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                            <div className='w-1/2'>
                                <p className="py-6 text-3xl">Take a tour of our luxurious rooms and explore the beautiful interior details.</p>
                                <button className="btn btn-primary text-white ">Book Now</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section>

                <section className="py-6 bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800">
	<div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
		<h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">Meet our team</h1>
		<p className="max-w-2xl text-center text-gray-400 dark:text-gray-600"> Meet the dedicated individuals who work tirelessly to bring you the best experience. From creative minds to diligent organizers, our team is here to serve you with passion and expertise.!</p>
		<div className="flex flex-row flex-wrap-reverse justify-center">
			<div className="flex flex-col justify-center m-8 text-center">
				<img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500 dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?0" />
				<p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
				<p className="text-gray-400 dark:text-gray-600">Co-Founder</p>
			</div>
			<div className="flex flex-col justify-center m-8 text-center">
				<img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500 dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?1" />
				<p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
				<p className="text-gray-400 dark:text-gray-600">Senior Designer</p>
			</div>
			<div className="flex flex-col justify-center m-8 text-center">
				<img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500 dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?2" />
				<p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
				<p className="text-gray-400 dark:text-gray-600">Visual Designer</p>
			</div>
			<div className="flex flex-col justify-center m-8 text-center">
				<img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500 dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?3" />
				<p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
				<p className="text-gray-400 dark:text-gray-600">Visual Designer</p>
			</div>
			<div className="flex flex-col justify-center m-8 text-center">
				<img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500 dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?4" />
				<p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
				<p className="text-gray-400 dark:text-gray-600">Visual Designer</p>
			</div>
			<div className="flex flex-col justify-center m-8 text-center">
				<img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500 dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?5" />
				<p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
				<p className="text-gray-400 dark:text-gray-600">Founder and CEO</p>
			</div>
		</div>
	</div>
</section>
                </section>
            </section>
        </div>
    );
};

export default About;
