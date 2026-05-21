import { useSearchParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import ProductDisplay from "../../Components/ProductDisplay/ProductDisplay";
import Title from "../../Components/TItle/Title";

const SearchResults = () => {
    const [products, loading] = useProducts();
    const [searchParams] = useSearchParams();

    const searchText = searchParams.get("query") || "";

    const filteredProducts = products.filter((product) =>
        product.title?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="px-5 lg:px-20 py-10 min-h-screen">
            <Title heading={`Search Results for "${searchText}"`} />

            {
                loading ? (
                    <div className="flex justify-center mt-10">
                        <span className="loading loading-spinner loading-lg text-info"></span>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <ProductDisplay products={filteredProducts} />
                ) : (
                    <div className="text-center text-sky-400 mt-10 text-xl">
                        No products found.
                    </div>
                )
            }
        </div>
    );
};

export default SearchResults;