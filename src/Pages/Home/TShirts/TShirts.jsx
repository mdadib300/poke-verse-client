import React from 'react';
import Title from '../../../Components/TItle/Title';
import useProducts from '../../../hooks/useProducts';
import BackBtn from '../../../Components/BackBtn/BackBtn';
import ProductDisplay from '../../../Components/ProductDisplay/ProductDisplay';


const TShirts = () => {

    const [products] = useProducts();
    const tshirts = products.filter(product => product.category === 'T-Shirt');

    return (
        <div>
            <Title heading={'T-Shirts'}></Title>
            <ProductDisplay products={tshirts}></ProductDisplay>
            
            <BackBtn></BackBtn>
        </div>
    );
};

export default TShirts;