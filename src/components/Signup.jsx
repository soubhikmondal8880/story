import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../customStyles.css";
import { useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import Loader from "./Loader";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would usually send the data to your server
        setLoading(true);
        console.log(email, password, phone, name)

        fetch('https://storyway1-v1.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email: email, name: name, phone: phone, password: password })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                setLoading(false);
                alert("Registered successfully")
                navigate('/login');

            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);


            });


    };




    return (
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
            {loading && <Loader />}
            <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1 animate-slide-up">
                <div className="flex-1 bg-blue-100 text-center hidden md:flex">
                    <div
                        className="w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(./signuppic.jpg)`,
                        }}
                    ></div>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex flex-col items-center">
                        <div className="text-center">
                            <h1 className="text-1xl xl:text-3xl font-extrabold text-blue-400">
                                Join the StoryWay Community
                            </h1>
                            <p className="text-[12px] text-gray-500">
                                Enter your details to create your account
                            </p>
                        </div>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs flex flex-col gap-4">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="tel"
                                        placeholder="Enter your phone"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <input
                                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}

                                    />
                                    <button className="mt-5 tracking-wide font-semibold bg-black text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit" value='submit'>
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Sign Up</span>
                                    </button>
                                </form>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    Already have an account?{" "}
                                    <Link to="/login">
                                        <span className="text-blue-900 font-semibold">Sign in</span>
                                    </Link>
                                </p>
                                {/* Home Button */}
                                <Link to="/">
                                    <button className="mt-3 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 12l2-2m0 0l7-7 7 7m-7-7v18" />
                                        </svg>
                                        <span className="ml-3">Home</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
