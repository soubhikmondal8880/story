import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Storylines = () => {
    const { storyId } = useParams();  // Get the story_id from the URL
    const [storylines, setStorylines] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {

            fetch(`https://storyway1-v1.onrender.com/getStoryline/${storyId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        console.log(response);
                        throw new Error('Failed to fetch storylines');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setStorylines(data);
                })
                .catch(error => {
                    setError(error.message);
                });
        } else {
            setError('No token found, please log in first.');
        }
    }, [storyId]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8">
            <div className="container mx-auto">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {!error && storylines.length === 0 && (
                    <p className="text-center text-gray-600">No storylines found for this story.</p>
                )}
                <ul className="space-y-4">
                    {storylines.map((storyline) => (
                        <li key={storyline.storylineId} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
                            <h2 className="text-2xl font-bold text-gray-800">{storyline.title}</h2>
                            <p className="text-gray-600">{storyline.content}</p>
                            <p className="text-gray-600">{storyline.pid}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


