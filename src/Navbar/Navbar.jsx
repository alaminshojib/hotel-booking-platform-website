import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import './NavStyle.css'
import { AuthContext } from "../providers/AuthProvider";
import { FiSun, FiMoon } from 'react-icons/fi';
import Swal from "sweetalert2";

const Navbar = ({ isDarkMode, toggleTheme }) => {


    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "To gain full access, you need to log in again!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Log Out!'
            });

            if (result.isConfirmed) {
                logOut()


                if (!response.ok) {
                    throw new Error('Failed to delete craft item');

                }

                const data = await response.json();
                if (data.deletedCount > 0) {
                    Swal.fire(
                        'Deleted!',
                        'Your craft item has been deleted.',
                        'success'
                    );

                }
            }
        } catch (error) {
            console.error('Error deleting craft item:', error);

        } finally {
            window.location.reload()
        }
    };


    const navLinks = <>
        <NavLink className={'px-4 py-2 rounded-full font-medium'} to="/">Home</NavLink>
        <NavLink className={'px-4 py-2 rounded-full font-medium'} to="/rooms">Rooms</NavLink>
        <NavLink className={'px-4 py-2 rounded-full font-medium'} to="/mybookings">My Bookings</NavLink>
        <NavLink className={'px-4 py-2 rounded-full font-medium'} to="/about">About Us</NavLink>
        <NavLink className={'px-4 py-2 rounded-full font-medium'} to="/contact">Contact Us</NavLink>

    </>
    return (
        <div>
            <div className="navbar bg-nav py-3 px-3 shadow-lg ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <div tabIndex={0} className="flex menu menu-sm dropdown-content mt-3 z-[3] p-2 shadow bg-slate-200  rounded-box w-52 ">
                            <NavLink className={'px-4 py-2 rounded-full text-gray-900 font-medium'} to="/">Home</NavLink>
                            <NavLink className={'px-4 py-2 rounded-full text-gray-900 font-medium'} to="/rooms">Rooms</NavLink>
                            <NavLink className={'px-4 py-2 rounded-full text-gray-900 font-medium'} to="/mybookings">My Bookings</NavLink>
                            <NavLink className={'px-4 py-2 rounded-full text-gray-900 font-medium'} to="/about">About Us</NavLink>
                            <NavLink className={'px-4 py-2 rounded-full text-gray-900 font-medium'} to="/contact">Contact Us</NavLink>
                            {
                                user && user ?
                                    <Link onClick={handleSignOut} className=" px-4 py-2 mt-1 rounded-full  font-medium text-gray-900">Log Out</Link>

                                    :
                                    <Link className="px-4 py-2 rounded-full mt-1  font-medium text-gray-900" to="/login" >Login</Link>
                            }

                            <div className="container justify-end px-4 mt-1">
                                <p className=" py-2 rounded-full  font-medium text-gray-900">Change Theme :</p>
                                <label className="cursor-pointer grid place-items-center ">
                                    <input onChange={toggleTheme} checked={isDarkMode} type="checkbox" value="synthwave" className="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" />
                                    {isDarkMode ?
                                        <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100 m-1 " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                        :
                                        <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100 m-1 " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>

                                    }


                                </label>

                            </div>



                        </div>
                    </div>
                    <Link to={"/"}><div className="flex gap-3 lg:text-2xl text-md rounded-xl md:p-2 items-center font-bold "><img className="w-5 h-5 lg:w-10 lg:h-10  shadow-lg rounded-md" src="/assets/arts.jpg" alt="" />
                        PlaceName</div></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className=" menu menu-horizontal px-1 gap-2 text-md font-medium  bg-transparent">

                        {navLinks}


                    </div>
                </div>



                <div className="container justify-end w-fit ml-2 hidden lg:block">
                    <label className="cursor-pointer grid place-items-center ">
                        <input onChange={toggleTheme} checked={isDarkMode} type="checkbox" value="synthwave" className="toggle theme-controller bg-amber-400 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-100 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" />
                        {isDarkMode ?
                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100 m-1 " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            :
                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100 m-1 " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>

                        }


                    </label>

                </div>

                <div className="navbar-end md:pr-3">

                    {
                        user && user ?
                            <div className="flex gap-4 items-center justify-center">

                                <Link  className="w-7 h-7 rounded-full tooltip" data-tip={user.displayName}>
                                    <img alt="" className=" rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100 w-full h-full" src={user.photoURL} />
                                </Link>
                                <div>
                                    <button onClick={handleSignOut} className="hidden md:block text-white px-5 py-2 rounded-full  bg-[#0632c3] hover:bg-[#57f0f0]  font-semibold hover:text-black ">Log Out</button>
                                </div>
                            </div>
                            :
                            <div className="space-x-2 flex justify-center items-center"><NavLink className=' px-5 py-2 mr-1 font-semibold rounded-full bg-cyan-500 ' to="/register" >Register</NavLink>
                                <NavLink className='hidden md:block px-5 py-2 rounded-full bg-green-500 font-semibold' to="/login" >Login</NavLink></div>
                    }
                </div>
            </div>


        </div>
    );
};




export default Navbar;

