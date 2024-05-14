import React, { useState, useEffect } from 'react';

const Map = () => {
  const [deviceSize, setDeviceSize] = useState('large');

  useEffect(() => {
    const checkDeviceSize = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setDeviceSize('small');
      } else if (width <= 1000) {
        setDeviceSize('medium');
      } else {
        setDeviceSize('large');
      }
    };

    window.addEventListener('resize', checkDeviceSize);
    checkDeviceSize();

    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  return (
    <div className="map-container">
      <div className="map rounded-lg justify-center mx-auto flex">
        <iframe
          className="rounded-lg border-2"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12962.106565185172!2d-0.12463701634208246!3d51.50072923147572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ceec1b46cb%3A0x8b200f6282d486c!2sBig%20Ben!5e0!3m2!1sen!2suk!4v1620588322230!5m2!1sen!2suk"
          width={deviceSize === 'small' ? '300' : deviceSize === 'medium' ? '500' : '900'}
          height={deviceSize === 'small' ? '200' : deviceSize === 'medium' ? '300' : '400'}
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Hotel Map"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
