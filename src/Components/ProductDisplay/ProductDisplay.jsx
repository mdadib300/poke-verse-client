import ProductCard from '../ProductCard/ProductCard';

const ProductDisplay = ({ products }) => {
    return (
        <div>
            <div className="flex justify-center mb-10 md:mb-20">
                <div className="
                grid  [@media(max-width:860px)]:grid-cols-2 [@media(max-width:1365px)]:grid-cols-3 lg:grid-cols-4 
                     gap-2  [@media(max-width:860px)]:gap-2     [@media(max-width:1365px)]:gap-10      lg:gap-15
                "
                >
                    {
                        products.map((product, id) => <ProductCard key={id} productInfo={product}></ProductCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;