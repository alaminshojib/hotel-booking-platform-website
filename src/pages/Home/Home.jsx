import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import Banner from '../../components/BannerPage';
import FeaturedRooms from '../../components/FeaturedRooms';
import UserReviews from '../../components/UserReviews';
import MapDetails from '../../components/MapDetails';
import Trustplot from '../../components/Trustplot';
import SpecialOffersModal from '../../components/SpecialOffersModal';
import CookieModal from '../../components/CookieModal';
import HelpCenter from '../../components/HelpCenter';

const Home = () => {
  const [showSpecialOffersModal, setShowSpecialOffersModal] = useState(true);
  const [showCookieModal, setShowCookieModal] = useState(true);

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

  const scrollToSection = (sectionId) => {
    scroll.scrollTo(sectionId);
  };

  return (
    <div id="home" className="App">
      {showSpecialOffersModal && <SpecialOffersModal key="specialOffersModal" closeModal={closeModal} />}
      <Banner scrollToSection={scrollToSection} />
      <FeaturedRooms scrollToSection={scrollToSection} />
      <MapDetails scrollToSection={scrollToSection} />
      <UserReviews scrollToSection={scrollToSection} />
      <HelpCenter></HelpCenter>
      <Trustplot scrollToSection={scrollToSection} />
      {showCookieModal && <CookieModal key="cookieModal" acceptCookies={acceptCookies} rejectCookies={rejectCookies} />}
    </div>
  );
};

export default Home;
