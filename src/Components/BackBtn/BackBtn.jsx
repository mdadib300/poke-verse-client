import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackBtn = () => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center mb-10'>
            <button className='px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white' onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
};

export default BackBtn;