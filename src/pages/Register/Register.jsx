import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = async ({ name, email, photo, password, confirmPassword }) => {
        try {
            setError('');
            setLoading(true);
    
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
    
            const regexUpperCase = /[A-Z]/;
            const regexLowerCase = /[a-z]/;
            if (!regexUpperCase.test(password) || !regexLowerCase.test(password) || password.length < 6) {
                throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
            }
    
            const result = await createUser(email, password);
            await updateProfile(result.user, { displayName: name, photoURL: photo });
            await logOut();
    
            Swal.fire({
                title: "Success!",
                text: "Registration completed successfully!",
                icon: "success"
            });

            setTimeout(() => {
                navigate('/login')
            }, 500);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Please use a different email address.');
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center z-50">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                </div>
            )}
            <section>
                <div className="shadow-lg my-3 rounded-2xl flex items-center p-3 mx-auto">
                    <div className="px-4 mx-auto justify-center items-center border rounded-xl bg-gray-300">
                        <h2 className="font-bold text-3xl text-[#002D74] mt-5 text-center">Register</h2>
                        <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4 w-72">
                            <input
                                type="text"
                                required
                                name="name"
                                placeholder="Full Name"
                                className="mt-5 p-2 rounded-xl border bg-gray-100 text-gray-800"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            <input
                                type="email"
                                required
                                name="email"
                                placeholder="Email"
                                className="p-2 rounded-xl border bg-gray-100 text-gray-800"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            <input
                                required
                                type="text"
                                name="photo"
                                placeholder="Photo Url"
                                className="p-2 rounded-xl border bg-gray-100 text-gray-800"
                                {...register("photo")}
                            />
                            <div className="relative">
                                <input
                                    className="p-2 rounded-xl border w-full bg-gray-100 text-gray-800"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    required
                                    placeholder="Password"
                                    {...register("password", { required: "Password is required" })}
                                />
                                <span onClick={() => setShowPassword(prevState => !prevState)}>
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" id="togglePassword" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer " id="mama" viewBox="0 0 16 16">
                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"></path>
                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"></path>
                                        </svg>
                                    )}
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    className="p-2 rounded-xl border w-full bg-gray-100 text-gray-800"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword", { required: "Confirm Password is required" })}
                                />
                                <span onClick={() => setShowConfirmPassword(prevState => !prevState)}>
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" id="togglePassword" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer " id="mama" viewBox="0 0 16 16">
                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"></path>
                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"></path>
                                        </svg>
                                    )}
                                </span>

                            </div>
                            <div> {error && <p className="text-red-500">{error}</p>}</div>

                            <button className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit">Register</button>
                        </form>
                        <div className=" items-center text-gray-100">
                            <hr className="border-gray-300" />
                        </div>
                        <div className="text-sm flex items-center container-mr text-gray-500 p-5">
                            If you already have an account..{' '}
                            <span onClick={handleLogin} className="text-[#002D74] rounded-xl hover:scale-110 font-semibold ml-2 cursor-pointer">Login</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
