import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const StartingStory = () => {
    const { storyId } = useParams();
    const [storylines, setStorylines] = useState([]);
    const [storyTitle, setStoryTitle] = useState(""); // New state for story title
    const [error, setError] = useState(null);

    async function fetchStorylines(storyId) {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found, please log in first.');
            return;
        }

        try {
            const response = await fetch(`https://storyway1-v1.onrender.com/getStartingStoryline/${storyId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch storylines');
            }

            const data = await response.json();
            setStorylines(data);
            setStoryTitle(data[0].story.title.toUpperCase()); // Set story title
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchStorylines(storyId);
    }, [storyId]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.8
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Navbar />
            <div
                className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
                style={{
                    backgroundImage: `linear-gradient(to right, #fbc2eb, #a6c0fe)`,
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'overlay',
                }}
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-teal-500 mb-8 md:mb-12 text-center">
                    {storyTitle} -<br /> Choose Your Adventure
                </h1>
                <motion.ul
                    className="space-y-6 w-full max-w-4xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {storylines.map((item) => (
                        <motion.li
                            key={item.storylineId}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 bg-gradient-to-br from-pink-100 via-blue-100 to-white text-blue-600 hover:bg-gradient-to-br hover:from-pink-200 hover:via-blue-200 hover:to-white hover:text-blue-800 transition bg-opacity-90 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
                            variants={itemVariants}
                        >
                            <Link
                                to={`/allStories/${storyId}/${item.storylineId}`}
                                className="flex flex-col md:flex-row items-start md:items-center justify-between w-full h-full"
                            >
                                <div className="flex items-start md:items-center w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 p-2 rounded-full text-teal-400 bg-teal-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8V4m0 16v-4m4-4h4m-8 0H4m16 0v4m-4-4h4m-8 0H4" />
                                    </svg>
                                    <div className="ml-4">
                                        <h3 className="text-lg md:text-xl font-semibold text-gray-800">{item.title}</h3>
                                        <p className="text-sm md:text-base text-gray-600">{item.content}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </>
    );
};

export default StartingStory;
