import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../../Components/SocialLogin/SocialLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
const Login = () => {
    const { signIn, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);



    const from = location.state?.form?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Login Successful",
                    confirmButtonText: "Okay",
                    customClass: {
                        confirmButton: 'bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded'
                    },
                    buttonsStyling: false
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: "Wrong Email or Password!",
                    confirmButtonText: "Okay",
                    customClass: {
                        confirmButton: 'bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded'
                    },
                    buttonsStyling: false
                });
            });
    }


    const handleForgotPassword = async () => {
        const { value: email } = await Swal.fire({
            title: "Reset Password",
            input: "email",
            inputLabel: "Enter your registered email",
            inputPlaceholder: "example@gmail.com",
            confirmButtonColor: "#262626",
            showCancelButton: true,
        });

        if (email) {
            resetPassword(email)
                .then(() => {
                    Swal.fire({
                        title: "Email Sent",
                        text: "Check your inbox (Spam folder also) for password reset link.",
                        confirmButtonColor: "#262626"
                    });
                })
                .catch((error) => {
                    Swal.fire("Error", error.message, "error");
                });
        }
    };

    return (
        <div>
            <div className="hero bg-white min-h-screen text-sky-400">
                <div className="hero-content flex-col w-90 md:w-100">
                    <h1 className="text-5xl font-semibold text-sky-400 text-center mb-7">Please Login</h1>
                    <div className="card bg-white w-full max-w-sm shrink-0 shadow-xl border border-sky-100">
                        <div className="card-body">
                            <SocialLogin></SocialLogin>
                            <div className="divider divider-info">OR</div>
                            <form onSubmit={handleLogin} className="space-y-4">
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

                                <div className="text-right">
                                    <button className="text-sky-400 hover:text-sky-500 text-sm font-medium cursor-pointer" onClick={handleForgotPassword}>Forgot password?</button>
                                </div>
                                <p>New here? <Link to='/signup'><u>Sign up!</u></Link></p>
                                <input className="w-full mt-4 px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white" type="submit" value="Login" />
                            </form>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;