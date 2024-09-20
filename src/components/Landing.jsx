import React, { useEffect, useRef } from 'react';
import '../App.css';


import HomePage from './Home.jsx';
import VideoBackground from './VideoBackground.jsx';
import Features from './Features.jsx';
import Team from './Team.jsx';

function Landing() {







    return (
        <div className=" " >
            <HomePage />
            <VideoBackground />
            <Features />
            <Team />

        </div>
    );
};

export default Landing;




{/*
      <motion.div
        whileInView={{ opacity: 1, x: "calc(100vw - 100vw)" }}
        transition={{ duration: 0.5 }}
        initial={{ x: "-100%", opacity: 0 }}
        className="p-4 bg-blue-300 m-2" id="first"><img src="./src/meri.jpg" height={400} /></motion.div>

*/}