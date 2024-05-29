import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Root from "../mainLayout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../components/ErrorPage";
import Rooms from "../pages/Rooms/Rooms";
import MyBookings from "../pages/MyBookings/MyBookings";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import RoomDetails from "../pages/Rooms/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import FeaturedRooms from "../components/FeaturedRooms";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage />,

        children: [

            {
                path: '/',
                element: <Home></Home>,

            },
            {
                path: '/rooms',
                element: <Rooms></Rooms>,

            },
            
            {
                path: '/roomDetails/:id',
                element: <PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>,
                loader: () => fetch('https://hotel-booking-platform-server-side.vercel.app/services')
            },
            {
                path: '/featuredRooms',
                element: <FeaturedRooms></FeaturedRooms>,
            },
           
            {
                path: '/mybookings',
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,

            },
            {
                path: '/bookNow',
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
                loader: () => fetch('https://hotel-booking-platform-server-side.vercel.app/services')

            },
            {
                path: '/about',
                element: <About></About>,
                loader: () => fetch('/api.json')

            },
            {
                path: '/contact',
                element: <Contact></Contact>,
                loader: () => fetch('/api.json')

            },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    }

]);

export default router;












