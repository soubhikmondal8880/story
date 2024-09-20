// src/components/HomePage.js
import { React } from 'react';
import ThreeDModel from './ThreeDModel';
import Navbar from './Navbar';

import { Link } from 'react-router-dom';

const HomePage = () => {




    return (
        <>
            <Navbar />

            <div className="  flex flex-wrap pt-10 justify-center">
                <ThreeDModel className="z-9" />
                <div className="text-center  bg-opacity-80 rounded-lg  z-10 absolute ">
                    <h1 className="text-4xl font-bold text-White-700 mb-4">Welcome to StoryWay</h1>
                    <p className="text-lg text-white mb-6">
                        Dive into a world where you control the narrative. Create, share, and explore stories like never before.
                    </p>
                    <Link to='/storyOption' className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-600 transition duration-300">
                        Get Started
                    </Link>
                </div>
            </div>



        </>
    );
}

export default HomePage;
