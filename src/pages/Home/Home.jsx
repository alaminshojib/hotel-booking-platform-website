
import NewsletterSignup from '../../components/NewsletterSignup';

import Banner from '../../components/BannerPage';
import FeaturedRooms from '../../components/FeaturedRooms';
import UserReviews from '../../components/UserReviews';
import MapDetails from '../../components/MapDetails';
import Trustplot from '../../components/Trustplot';


const Home = () => {

  return (
    <div className="App">
      <Banner/>
      <FeaturedRooms />
      < MapDetails></MapDetails>
      <NewsletterSignup />
      <UserReviews />
      <Trustplot></Trustplot>
    </div>
  );
};

export default Home;
