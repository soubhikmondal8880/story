import React from "react";
import { motion } from "framer-motion";

function Features() {
    return (
        <div className="text-center bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 p-16 md:p-20 pb-32 md:pb-48">
            <h1 className="text-4xl font-bold text-white mb-16 md:mb-20">Features</h1>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">

                <motion.div
                    className="bg-white flex flex-col items-center w-72 p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    initial={{ y: 50, opacity: 0 }}
                >
                    <img
                        src="./project01.jpg"
                        alt="Interactive Stories"
                        className="w-full h-64 object-cover mb-4 rounded-xl shadow-md"
                    />
                    <div className="text-gray-800 font-bold text-xl mb-2">Interactive Stories</div>
                    <p className="text-gray-700 text-base text-center">
                        Shape the story with your choices.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white flex flex-col items-center w-72 p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    initial={{ y: 50, opacity: 0 }}
                >
                    <img
                        src="./project06.jpg"
                        alt="User-Created Content"
                        className="w-full h-64 object-cover mb-4 rounded-xl shadow-md"
                    />
                    <div className="text-gray-800 font-bold text-xl mb-2">User-Created Content</div>
                    <p className="text-gray-700 text-base text-center">
                        Create and share your own tales.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white flex flex-col items-center w-72 p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    initial={{ y: 50, opacity: 0 }}
                >
                    <img
                        src="./project14.jpg"
                        alt="Connect & Collaborate"
                        className="w-full h-64 object-cover mb-4 rounded-xl shadow-md"
                    />
                    <div className="text-gray-800 font-bold text-xl mb-2">Connect & Collaborate</div>
                    <p className="text-gray-700 text-base text-center">
                        Team up with others.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default Features;
