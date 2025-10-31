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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                    {
                        sortedProducts.map((product, id) => <ProductCard key={id} productInfo={product}></ProductCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Categories;