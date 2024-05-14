import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const axiosSecure = axios.create({
    baseURL: 'https://hotel-booking-platform-server-side.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
                    .then(() => { 
                        navigate('/login')
                    })
                    .catch()
            }
        })
    }, [])

    return axiosSecure;
};

export default useAxiosSecure;