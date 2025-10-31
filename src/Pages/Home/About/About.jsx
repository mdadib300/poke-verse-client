import React from 'react';
import Title from '../../../Components/TItle/Title';

const About = () => {
    return (
        <div className='px-5 lg:px-30'>
            <Title heading="About Us"></Title>
            <h1 className='text-center text-xl text-sky-400 font-semibold'>About Us, Our Return & Exchange Policy and Other Info.</h1>
            <div className='text-sky-400 text-xl mb-5'>
                <p>
                    Thank you for shopping with Pokeverse!
                    <br />
                    We take pride in offering high-quality anime products and ensuring that every order is handled with care.
                    <br /><br />
                    <b>📦 No Return or Exchange</b><br />
                    All sales are final. We do not accept returns or exchanges once an order has been placed and shipped.
                    Please make sure to review your order carefully before completing your purchase.
                    <br /><br />
                    <b>🧾 Order Issues or Damaged Items</b><br />
                    If you receive a wrong item, a defective product, or your order arrives damaged, please contact us within 48 hours of delivery with clear photos of the issue.
                    We’ll review your case and provide a replacement or refund only if the mistake was on our side.
                    <br /><br />
                </p>
            </div>
        </div>
    );
};

export default About;