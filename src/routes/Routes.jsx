import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Root from "../mainLayout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../components/ErrorPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage />,

        children: [

            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('https://hotel-booking-platform-server-side.vercel.app/bookings')

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












