import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { signIn, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm(); 

    const handleLoginSuccess = () => {
        setShowError(false);
        Swal.fire({
            title: "Success!",
            text: "Successfully Logged In!",
            icon: "success"
        }).then(() => {
            navigate(location?.state ? location.state : '/');
        });
    };

    const handleLoginFailure = (error) => {
        console.error(error);
        setShowError(true);
    };

    const handleLogin = ({ email, password }) => {
        signIn(email, password)
            .then(handleLoginSuccess)
            .catch(handleLoginFailure);
    };

    const handleOAuthLogin = (provider) => {
        provider()
            .then(handleLoginSuccess)
            .catch(handleLoginFailure);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <section>
                <div className="shadow-lg rounded-2xl flex items-center md:p-5 mx-auto">
                    <div className="px-4  my-3 py-2 mx-auto justify-center items-center border rounded-xl bg-gray-300">
                        <h2 className="font-bold text-3xl text-[#002D74] text-center">Login</h2>
                        <p className="text-sm mt-4 text-[#002D74] text-center">If you're already a member, log in now.</p>

                        {showError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Error!</strong>
                                <span className="block sm:inline"> Incorrect email or password.</span>
                                <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setShowError(false)}>
                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <title>Close</title>
                                        <path fillRule="evenodd" d="M14.354 5.354a2 2 0 0 0-2.828 0L10 7.172 7.172 4.354a2 2 0 1 0-2.828 2.828L7.172 10l-2.828 2.828a2 2 0 1 0 2.828 2.828L10 12.828l2.828 2.828a2 2 0 1 0 2.828-2.828L12.828 10l2.828-2.828a2 2 0 0 0 0-2.828z"/>
                                    </svg>
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
                            <input className="p-2 mt-8 rounded-xl border bg-gray-100 text-gray-800" type="email" name="email" placeholder="Email" {...register("email", { required: true })} />
                            {errors.email && <span className="text-red-500">Email is required</span>}
                            <div className="relative">
                                <input className="p-2 rounded-xl border w-full bg-gray-100 text-gray-800" type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    {...register("password", { required: true })} />
                                <span onClick={togglePasswordVisibility}>
                                    {passwordVisible ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" id="togglePassword"
                                            className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                                            viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer "
                                            id="mama" viewBox="0 0 16 16">
                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"></path>
                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"></path>
                                        </svg>
                                    )}
                                </span>
                            </div>
                            <div className="px-2 justify-start mx-0 text-sm text-gray-500">Forget password?</div>
                            <button className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit">Login</button>
                        </form>

                        <div className="mt-4 items-center text-gray-100">
                            <hr className="border-gray-600" />
                            <p className="text-center text-black text-sm">OR</p>
                            <hr className="border-gray-600" />
                        </div>
                        <button onClick={() => handleOAuthLogin(signInWithGoogle)} className="text-[#002D74] border-2 py-2 w-fit px-3 mx-auto rounded-xl mt-3 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
                            <FcGoogle className="mr-3" />
                            Login with Google
                        </button>
                        <button onClick={() => handleOAuthLogin(signInWithGithub)} className="text-[#002D74] border-2 py-2 w-fit px-3 mx-auto rounded-xl mt-2 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
                            <FaGithub className="mr-3" />
                            Login with GitHub
                        </button>

                        <div className="mt-4 text-sm flex items-center px-2 pb-4 text-gray-500">
                            <p>If you don't have an account..</p>
                            <span onClick={() => navigate('/register')} className="text-[#002D74] rounded-xl hover:scale-110 font-semibold cursor-pointer ml-2">Register</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
