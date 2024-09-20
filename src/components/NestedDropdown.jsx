import React, { useState, useEffect } from 'react';
import { fetchStorylines, addStoryline } from './StorylineUtil.js';
import { useParams } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import NewStorylineModal from './StorylineModal';
import Navbar from './Navbar.jsx';

const NestedDropdown = () => {
    const [hierarchicalStorylines, setHierarchicalStorylines] = useState([]);
    const [openStoryline, setOpenStoryline] = useState({});
    const [selectedParent, setSelectedParent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { storyId } = useParams(); // Destructured useParams for storyId
    async function getStorylines() {
        try {
            const hierarchy = await fetchStorylines(storyId);
            setHierarchicalStorylines(hierarchy);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {


        getStorylines();
    }, [storyId]);

    const toggleStoryline = (id) => {
        setOpenStoryline((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const openModal = (parentStorylineId) => {
        setSelectedParent(parentStorylineId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedParent(null);
    };

    const handleAddStoryline = async (title, content) => {
        try {
            await addStoryline(storyId, title, content, selectedParent)
            console.log('Storyline added. Fetching updated data...');
            await getStorylines();
            closeModal();
        } catch (error) {
            console.error('Failed to add storyline:', error);
        }
    };

    const renderStoryline = (storyline) => {
        return (
            <li key={storyline.storylineId} className="mb-2">
                <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200">
                    <div>
                        <span className="font-bold text-gray-800"><p className='text-wrap'>{storyline.title}</p></span>
                        <p className="text-sm text-gray-600 mt-1 text-wrap  ">
                            {storyline.content}
                        </p>
                    </div>
                    <div className="flex items-center">
                        {storyline.children && storyline.children.length > 0 && (
                            <button onClick={() => toggleStoryline(storyline.storylineId)} className="ml-2">
                                {openStoryline[storyline.storylineId] ? (
                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        )}
                        <button onClick={() => openModal(storyline.storylineId)} className="ml-4 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-400 transition duration-200">
                            +
                        </button>
                    </div>
                </div>
                {openStoryline[storyline.storylineId] && storyline.children && (
                    <ul className="ml-6 mt-2 pl-2 border-l-2 border-gray-300">
                        {storyline.children.map((child) => renderStoryline(child))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <>
            <Navbar />
            <h1 className="text-4xl md:text-5xl font-extrabold text-teal-500 mt-3 mb-8 md:mb-12 text-center"> Add storylines</h1>
            <button onClick={() => openModal(0)} className="ml-4 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-400 transition duration-200">
                Create new Root
            </button>
            <ul className="list-none p-6 bg-white shadow-lg rounded-lg">
                {hierarchicalStorylines.map((storyline) => renderStoryline(storyline))}
            </ul>
            {isModalOpen && (
                <NewStorylineModal
                    onClose={closeModal}
                    onSave={handleAddStoryline}
                    parentStorylineId={selectedParent}
                />
            )}
        </>
    );
};

export default NestedDropdown;
