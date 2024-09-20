import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75 z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
};

export default Loader;
