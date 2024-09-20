import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStorylines, findStoryline } from './StorylineUtil.js';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Loader from './Loader.jsx';

const StorylinePageLoader = () => {
    const { storyId, storylineId } = useParams();
    const navigate = useNavigate();
    const [hierarchicalStorylines, setHierarchicalStorylines] = useState([]);
    const [currentStoryline, setCurrentStoryline] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    async function putCurrentStory() {
        await fetch('https://storyway1-v1.onrender.com/updateCurrentStory', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ storyId: parseInt(storyId, 10), storylineId: parseInt(storylineId, 10) })
        })
            .then(response => response.text())
            .then(data => {
                console.log('Success:', data);


            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    useEffect(() => {
        async function getStorylines() {


            try {
                // Fetch the storylines for the given story ID
                const hierarchy = await fetchStorylines(storyId);
                setHierarchicalStorylines(hierarchy);

                // Find and set the current storyline
                if (storylineId) {
                    const storyline = findStoryline(parseInt(storylineId, 10), hierarchy);
                    setCurrentStoryline(storyline);
                    await putCurrentStory();

                }
            } catch (error) {
                setError(error.message);
            }
        }

        getStorylines();
    }, [storyId, storylineId]);

    // Handle errors
    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
    }

    // Handle loading state
    if (!currentStoryline) {
        return <div className="text-center text-gray-500 mt-10">Loading...</div>;
    }

    // Function to handle navigation to the next storyline  
    const handleNavigate = (nextStorylineId) => {
        navigate(`/allStories/${storyId}/${nextStorylineId}`);
    };

    return (<>
        <Navbar />

        <div className="min-h-screen bg-blue-100 p-4 sm:p-8"

        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-4xl mx-auto bg-gradient-to-br from-gray-300 via-blue-300 to-pink-200 p-6 sm:p-8 shadow-lg rounded-xl mb-8"
            >
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-800 italic" >
                    {currentStoryline.title.toUpperCase()}
                </h1>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-8">
                    {currentStoryline.content}
                </p>
            </motion.div>



            {/* Render children or navigation links as full-page buttons */}
            {currentStoryline.children.length > 0 && (
                <div className="max-w-4xl mx-auto">
                    {currentStoryline.children.map(child => (
                        <motion.div
                            key={child.storylineId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 * child.storylineId, ease: "easeOut" }}
                            className="w-full mb-4"
                        >
                            <button
                                onClick={() => handleNavigate(child.storylineId)}
                                className="font-bold w-full bg-gradient-to-br from-pink-100 via-blue-100 to-white text-blue-600 px-6 py-4 rounded-lg shadow-lg hover:bg-gradient-to-br hover:from-pink-200 hover:via-blue-200 hover:to-white hover:text-blue-800 transition duration-300 text-left"
                            >
                                {child.title.toUpperCase()}
                            </button>
                        </motion.div>
                    ))}
                </div>



            )}
        </div>
    </>
    );
};

export default StorylinePageLoader;
