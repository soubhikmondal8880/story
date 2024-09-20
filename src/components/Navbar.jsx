import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/">
                            <img
                                className="h-8 w-auto "
                                src="/story.png"
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-white hover:text-gray-300 transition duration-300"
                        >
                            HOME
                        </Link>
                        <Link
                            to="/storyOption"
                            className="text-white hover:text-gray-300 transition duration-300"
                        >
                            MENU
                        </Link>
                        <Link
                            to="/allStories"
                            className="text-white hover:text-gray-300 transition duration-300"
                        >
                            STORIES
                        </Link>
                        {!isLoggedIn && (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="text-white hover:text-gray-300 focus:outline-none"
                            aria-label="Open menu"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-0 z-50 transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } bg-gradient-to-r from-purple-500 to-pink-500`}
            >
                <div className="relative flex flex-col h-full  shadow-md">
                    <button
                        type="button"
                        className="absolute top-4 right-4 text-gray-700 hover:text-blue-500 focus:outline-none"
                        aria-label="Close menu"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div className="flex flex-col items-center justify-center mt-16 space-y-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-500 transition duration-300 text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            HOME
                        </Link>
                        <Link
                            to="/storyOption"
                            className="text-gray-700 hover:text-blue-500 transition duration-300 text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            MENU
                        </Link>
                        <Link
                            to="/allStories"
                            className="text-gray-700 hover:text-blue-500 transition duration-300 text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            STORIES
                        </Link>

                        {!isLoggedIn && (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
