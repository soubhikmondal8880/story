import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../services/AuthContext';

const AddStoryForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('token');
    const [stories, setStories] = useState([]);


    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    async function getStories() {

        if (token) {
            fetch('https://storyway1-v1.onrender.com/storiesOfAuthor', {
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
    }


    useEffect(() => {
        getStories();
    }
        , []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would usually send the data to your server

        fetch('https://storyway1-v1.onrender.com/createStory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: title, description: description })
        })
            .then(response => response.text())
            .then(data => {
                console.log('Success:', data);
                getStories();
                alert(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setTitle('');
        setDescription('');

    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 bg-cover bg-center" style={{ backgroundImage: `url('/src/background.jpg')` }}>
                <div className="flex bg-white bg-opacity-90 rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full animate-slide-up">
                    <div
                        className="hidden md:block lg:w-1/2 bg-cover"
                        style={{
                            backgroundImage: `url('./bgforcreatestory.jpeg')`,
                        }}
                    ></div>


                    <form onSubmit={handleSubmit} className=" m-20  flex flex-col   items-center ">

                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Story</h2>
                        <div className="mb-5">
                            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                            <input
                                id="title"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                                placeholder="Enter story title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                            <textarea
                                id="description"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                                rows="3"
                                placeholder="Enter story description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-pink-300 via-blue-200 to-pink-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:from-pink-400 hover:via-blue-300 hover:to-pink-400 transition duration-300"
                        >
                            Add Story
                        </button>
                    </form>


                </div >
            </div>
            <div className="overflow-x-auto m-10 flex flex-col">
                <h2 className="text-xl font-bold mb-4">My stories</h2>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-purple-300 bg-purple-100 text-left text-sm leading-4 text-purple-800 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 border-b-2 border-pink-300 bg-pink-100 text-left text-sm leading-4 text-pink-800 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 border-b-2 border-blue-300 bg-blue-100 text-left text-sm leading-4 text-blue-800 uppercase tracking-wider">
                                Author
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((story) => (
                            <tr key={story.storyId} className="hover:bg-purple-50">
                                <td className="px-6 py-4 border-b border-purple-200 text-sm text-purple-700">

                                    {story.title} <Link to={`/createStory/${story.storyId}`} className='ml-10'> Edit</Link>

                                </td>
                                <td className="px-6 py-4 border-b border-pink-200 text-sm text-pink-700">
                                    {story.description}
                                </td>
                                <td className="px-6 py-4 border-b border-blue-200 text-sm text-blue-700">
                                    {story.author}
                                </td>
                                <td>  </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>





        </>
    );
};

export default AddStoryForm;
