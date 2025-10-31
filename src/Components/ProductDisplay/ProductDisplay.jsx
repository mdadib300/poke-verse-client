import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const ProductDisplay = ({ products }) => {
    return (
        <div>
            <div className="flex justify-center mb-10 md:mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        products.map((product, id) => <ProductCard key={id} productInfo={product}></ProductCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;