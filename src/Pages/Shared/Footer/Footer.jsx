import React, { useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Footer = () => {
    const axiosSecure = useAxiosSecure();
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        const res = await axiosSecure.get("/categories");
        setCategories(res.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <footer>
                <div className="footer sm:footer-horizontal bg-white text-sky-400 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] pl-5 lg:pl-30">
                    <nav>
                        <h6 className="footer-title text-sky-600">Products</h6>
                        {
                            categories.map((category, index) => <Link key={index} to="/allproductandcategories">{category.category}</Link>)
                        }
                    </nav>
                    <nav>
                        <h6 className="footer-title text-sky-600">Info.</h6>
                        <Link to="/about">About Us</Link>
                        <Link to="/about">Retun & Exchange</Link>
                        <Link to="/about">Order Issues</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                    <nav>
                        <img src={logo} className='w-30 mb-5' />
                        <div className="grid grid-flow-col gap-4">
                            <a className='text-2xl' href='https://www.facebook.com/share/1FbkRArnJo/' target='_blank'>
                                <FaFacebook></FaFacebook>
                            </a>
                            <a className='text-2xl' href='https://www.instagram.com/pokeverse8?igsh=MXg4NTZwOWphNnV4NQ==' target='_blank'>
                                <FaInstagram></FaInstagram>
                            </a>
                            <a className='text-2xl' href='https://youtube.com/@pokexelversion1?si=XD7SAi57Ky4EXNy0' target='_blank'>
                                <FaYoutube></FaYoutube>
                            </a>
                        </div>
                    </nav>
                </div>
                <p className='text-center text-sky-400 pb-5'>Copyright © {new Date().getFullYear()} - All right reserved by Poké Verse</p>
            </footer>
        </div>
    );
};

export default Footer;