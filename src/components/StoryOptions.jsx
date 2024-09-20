import React, { useContext, useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const StoryOptions = () => {
    const navigate = useNavigate();
    const [error, setError] = useState();
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to='/login' />;
    }

    const resumeStory = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found, please log in first.');
            return;
        }

        try {
            const response = await fetch('https://storyway1-v1.onrender.com/CurrentStory', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            console.log(data);
            if (data.current_story_id && data.current_storyline_id) {
                navigate(`/allStories/${data.current_story_id}/${data.current_storyline_id}`)
            }

        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    };

    const createCustomStory = () => {
        // Implement routing logic for creating a custom story
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-4">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-white mb-10 md:mb-16 text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Welcome to StoryWay
                </motion.h1>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center justify-center w-full max-w-md md:max-w-none">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        className="w-full md:w-auto"
                    >
                        <Link
                            to='/allStories'
                            className="w-full md:w-auto block text-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
                        >
                            Start New Story
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                        className="w-full md:w-auto"
                    >
                        <button
                            onClick={resumeStory}
                            className="w-full md:w-auto block text-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
                        >
                            Resume Story
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                        className="w-full md:w-auto"
                    >
                        <Link
                            onClick={createCustomStory}
                            to='/createStory'
                            className="w-full md:w-auto block text-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
                        >
                            Create Custom Story
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default StoryOptions;
