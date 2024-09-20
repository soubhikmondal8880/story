import React, { useEffect, useRef, useState } from 'react';

const VideoBackground = () => {
    const videoRef = useRef(null);




    return (
        <div style={{}}>
            <video
                ref={videoRef}
                src="./background2.mp4" // Replace with your video source
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
                muted // Optional: Mute the video
                autoPlay
                loop

            />
        </div>
    );
};

export default VideoBackground;
