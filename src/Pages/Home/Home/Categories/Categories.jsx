import ProductCard from '../../../../Components/ProductCard/ProductCard';
import Title from '../../../../Components/TItle/Title';
import useProducts from '../../../../hooks/useProducts';

const Categories = () => {

    const [products] = useProducts();
    const sortedProducts = [...products].reverse();

    return (
        <div>
            <Title heading={'Discover Our Products'}></Title>
            <div className='flex justify-center mb-20'>
                <div className="
                grid  [@media(max-width:860px)]:grid-cols-2 [@media(max-width:1365px)]:grid-cols-3 lg:grid-cols-4 
                     gap-2  [@media(max-width:860px)]:gap-2     [@media(max-width:1365px)]:gap-10      lg:gap-15
                "
                >
                    {
                        sortedProducts.map((product, id) => <ProductCard key={id} productInfo={product}></ProductCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Categories;

// grid-cols-4
                // [@media(max-width:1230px)]:grid-cols-3
                // [@media(max-width:905px)]:grid-cols-2
                // [@media(max-width:380px)]:grid-cols-1 
                // gap-2 
                // [@media(max-width:1370px)]:gap-5 
                // lg:gap-15