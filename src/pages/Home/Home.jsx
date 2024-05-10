
import NewsletterSignup from '../../components/NewsletterSignup';

import Map from '../../components/Map';
import Banner from '../../components/BannerPage';
import FeaturedRooms from '../../components/FeaturedRooms';
import UserReviews from '../../components/UserReviews';
import { useLoaderData } from 'react-router-dom';


const Home = () => {
  const hi=useLoaderData()

  return (
    <div className="App">
      Hi: {hi.length}
      <Banner/>
      <FeaturedRooms />
      < Map />
      <NewsletterSignup />
      <UserReviews />
    </div>
  );
};

export default Home;
