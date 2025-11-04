import React from 'react';

const Title = ({heading}) => {
    return (
        <div className='my-10'>
            <h1 className='text-center text-3xl md:text-4xl font-semibold text-sky-400'>{heading}</h1>
        </div>
    );
};

export default Title;