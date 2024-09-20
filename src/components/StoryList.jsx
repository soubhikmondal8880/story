import React, { useEffect, useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const StoryList = () => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);

    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to='/login' />;
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch('https://storyway1-v1.onrender.com/stories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch stories');
                    }
                    return response.json();
                })
                .then(data => {
                    setStories(data);
                })
                .catch(error => {
                    setError(error.message);
                });
        } else {
            setError('No token found, please log in first.');
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-t from-black   via-cyan-200  to-pink-300  p-8">
                <div className="container mx-auto">
                    <h1 className="text-5xl font-bold text-teal-500 text-center mb-12">
                        All Stories
                    </h1>

                    {error && <div className="text-red-400 text-center mb-4">{error}</div>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {stories.map((story, index) => (
                            <motion.div
                                key={story.storyId}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                className=" rounded-lg   shadow-2xl p-6 transform hover:scale-105 transition bg-white"
                            >
                                <h2 className="text-3xl font-semibold text-black mb-4">{story.title.toUpperCase()}</h2>
                                <p className="text-gray-800 mb-4">{story.description}</p>
                                <p className="text-gray-800 italic">By {story.author}</p>
                                <div className="mt-6 text-center">
                                    <Link
                                        to={`/allStories/${story.storyId}`}
                                        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition duration-300"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default StoryList;
