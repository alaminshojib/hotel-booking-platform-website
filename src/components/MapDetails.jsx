import React from 'react';
import PigeonMap from './pigeonMap';

const MapDetails = () => {
    return (
        <div><section className="md:p-5">
        
        <div className='mx-auto justify-center text-center py-5 w-3/5'>
        <h1 className='lg:text-2xl md:text-xl text-md font-bold'>Discover Our Location: Navigate Your Perfect Getaway</h1>
        <p className='text-gray-500 py-4 text-xs md:text-sm'>Explore our hotel's prime location with ease using our interactive map feature.  </p>
      </div>
        <div className="container flex flex-col mx-auto  justify-center lg:flex-row">
            <div><PigeonMap></PigeonMap></div>
           
        </div>
    </section>
            
        </div>
    );
};

export default MapDetails;