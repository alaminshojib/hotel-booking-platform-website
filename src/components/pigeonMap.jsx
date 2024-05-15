import React, { useState, useEffect } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';

const CustomOverlay = ({ anchor, payload }) => (
  <Overlay anchor={anchor} offset={[120, 79]}>
    <div style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
      <h3>{payload.title}</h3>
      <p>{payload.description}</p>
    </div>
  </Overlay>
);

const PigeonMap = () => {
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
        <Map center={[23.685, 90.3563]} zoom={8} width={deviceSize === 'small' ? 300 : deviceSize === 'medium' ? 500 : 900} height={deviceSize === 'small' ? 200 : deviceSize === 'medium' ? 300 : 400}>
          <Marker anchor={[23.685, 90.3563]} payload={{ title: 'Bangladesh', description: 'Default Location' }} />
          <CustomOverlay anchor={[23.685, 90.3563]} payload={{ title: 'Bangladesh', description: 'Default Location' }} />
        </Map>
      </div>
    </div>
  );
};

export default PigeonMap;
