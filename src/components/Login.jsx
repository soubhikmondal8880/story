import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";
import Loader from "./Loader";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return <Navigate to="/storyOption" />;
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message before login attempt
        console.log(email, password);

        setIsLoading(true);
        fetch('https://storyway1-v1.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parses the response body as JSON
            })
            .then(data => {
                console.log('Data:', data);
                // Store the token and user details in localStorage
                login(data.token, { email: data.email, name: data.name });
                setIsLoading(false);

            })
            .catch(error => {
                setIsLoading(false);
                console.error('There was a problem with the fetch operation:', error);
            })


    }


    return (
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 bg-cover bg-center" style={{ backgroundImage: `url('/src/background.jpg')` }}>
            {isLoading && <Loader />}
            <div className="flex bg-white bg-opacity-90 rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full animate-slide-up">
                <div
                    className="hidden md:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage: `url('./signuppic.jpg')`,
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <Link
                        className="absolute top-4 left-4 bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 transition duration-300 ease-in-out animate-bounce"
                        to='/'
                    >
                        Home
                    </Link>
                    <p className="text-2xl font-semibold text-gray-700 text-center mb-6 animate-fade-in">Welcome back!</p>
                    <form onSubmit={handleLogin}>

                        <div className="mt-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700 transition duration-300 ease-in-out animate-bounce-in"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 flex flex-col justify-between">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                            </div>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700 transition duration-300 ease-in-out animate-bounce-in"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <a
                                href="#"
                                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                            >
                                Forget Password?
                            </a>
                        </div>
                        <div className="mt-8">
                            <button type='submit'
                                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 animate-pulse">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 flex items-center w-full text-center">
                        <Link
                            to='/signup'
                            className="text-xs text-gray-500 capitalize text-center w-full hover:text-blue-700 transition duration-300 ease-in-out"
                        >
                            Don&apos;t have any account yet?
                            <span className="text-blue-700"> Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
