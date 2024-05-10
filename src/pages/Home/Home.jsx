import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from "../../components/Slider";
import { useLoaderData } from 'react-router-dom';



const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);
    const craft = useLoaderData();




    return (
        <div>
            <Slider key={craft._id} craft={craft} />
            



        </div>
    );
};

export default Home;
