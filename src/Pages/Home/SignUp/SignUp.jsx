import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SocialLogin from '../../../Components/SocialLogin/SocialLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

        if (!passwordRegex.test(password)) {
            Swal.fire({
                title: "Invalid Password",
                text: "Your password must be at least 8 characters long and include at least one letter, one number, and one special character (e.g. @, #, $, %, !, ^, &, *).",
                icon: "warning",
                confirmButtonText: "Okay",
                customClass: {
                    confirmButton: 'bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded'
                },
                buttonsStyling: false
            });
            return;
        }

        console.log(name, email, password);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    name: name,
                    email: email
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Sign up Successful.",
                                confirmButtonText: "Okay",
                                customClass: {
                                    confirmButton: 'bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded'
                                },
                                buttonsStyling: false
                            });
                            form.reset();
                            navigate('/');
                        }
                    })

            })

    }
    return (
        <div>
            <div className="hero bg-white min-h-screen text-sky-400">
                <div className="hero-content flex-col w-90 md:w-100">
                    <h1 className="text-5xl font-semibold text-sky-400 text-center mb-7">Please Sign Up</h1>
                    <div className="card bg-white w-full max-w-sm shrink-0 shadow-xl border border-sky-100">
                        <div className="card-body">
                            <SocialLogin></SocialLogin>
                            <div className="divider divider-info">OR</div>
                            <form onSubmit={handleSignUp} className="space-y-4">
                                <label className="block text-sky-400 font-medium">Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder="Enter your Name"
                                    required
                                    className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                                />
                                <label className="block text-sky-400 font-medium">Email</label>
                                <input
                                    type="email"
                                    name='email'
                                    required
                                    placeholder="Enter your Email address"
                                    className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                                />

                                <label className="block text-sky-400 font-medium mt-3">Password</label>
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        required
                                        placeholder="Enter your password"
                                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-sky-400 hover:text-sky-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <p>Already have an account? <u><Link to="/login">Login</Link></u></p>
                                <input className="w-full mt-4 px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white" type="submit" value="Sign Up" />
                            </form>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default SignUp;