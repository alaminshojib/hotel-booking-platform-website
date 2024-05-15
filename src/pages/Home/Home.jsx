import React, { useEffect, useState } from 'react';
import Banner from '../../components/BannerPage';
import FeaturedRooms from '../../components/FeaturedRooms';
import UserReviews from '../../components/UserReviews';
import MapDetails from '../../components/MapDetails';
import Trustplot from '../../components/Trustplot';
import SpecialOffersModal from '../../components/SpecialOffersModal';
import CookieModal from '../../components/CookieModal';

const Home = () => {
  const [showSpecialOffersModal, setShowSpecialOffersModal] = useState(true);
  const [showCookieModal, setShowCookieModal] = useState(true);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('home');
      if (element) {
        const boundingClientRect = element.getBoundingClientRect();
        const top = boundingClientRect.top;
        if (top >= 0 && top <= window.innerHeight) {
          setAnimation(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      setShowCookieModal(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieModal(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowCookieModal(false);
  };

  const closeModal = () => {
    setShowSpecialOffersModal(false);
  };

  return (
    <div id="home" className={`App ${animation ? 'aos-animate' : ''}`}>
      {showSpecialOffersModal && <SpecialOffersModal key="specialOffersModal" closeModal={closeModal} />}
      <Banner />
      <FeaturedRooms />
      <MapDetails />
      <UserReviews />
      <Trustplot />
      {showCookieModal && <CookieModal key="cookieModal" acceptCookies={acceptCookies} rejectCookies={rejectCookies} />}
    </div>
  );
};

export default Home;
