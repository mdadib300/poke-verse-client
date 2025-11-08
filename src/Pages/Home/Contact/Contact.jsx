import React from 'react';
import Title from '../../../Components/TItle/Title';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6';

const Contact = () => {
    return (
        <div className='px-5 lg:px-30'>
            <Title heading="Conact Info."></Title>
            <div className='text-sky-400 text-xl mb-5 min-h-screen'>
                <p>
                    <b>📩 Contact Us</b><br />
                    For any order-related issues, please reach out at:<br />
                    Email: info@pokeversebd.shop<br />
                    Phone: 01607610104<br />
                </p>
                <p className='mt-3 font-bold'>Social Media Links:</p>
                <nav className="flex mt-2">
                    <a className='text-2xl mr-2' href='https://www.facebook.com/share/1FbkRArnJo/' target='_blank'>
                        <FaFacebook></FaFacebook>
                    </a>
                    <a className='text-2xl mr-2' href='https://www.instagram.com/pokeverse8?igsh=MXg4NTZwOWphNnV4NQ==' target='_blank'>
                        <FaInstagram></FaInstagram>
                    </a>
                    <a className='text-2xl' href='https://youtube.com/@pokexelversion1?si=XD7SAi57Ky4EXNy0' target='_blank'>
                        <FaYoutube></FaYoutube>
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default Contact;