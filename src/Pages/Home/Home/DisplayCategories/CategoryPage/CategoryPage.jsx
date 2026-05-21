import { useParams } from "react-router-dom";
// import { useState } from "react";
import useProducts from "../../../../../hooks/useProducts";
import ProductDisplay from "../../../../../Components/ProductDisplay/ProductDisplay";
import createSlug from "../../../../../utils/CreateSlug";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const [products, loading] = useProducts();

  // SEARCH PAUSED
  // const [searchText, setSearchText] = useState("");

  // FILTER CATEGORY PRODUCTS
  const categoryProducts = products.filter(
    (product) => createSlug(product.category) === categoryName,
  );

  // SEARCH PAUSED
  // const filteredProducts = categoryProducts.filter(product =>
  //     product.title?.toLowerCase().includes(searchText.toLowerCase())
  // );

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 lg:px-20 py-10">
      <h1 className="text-4xl text-center text-sky-400 font-bold mb-10">
        {categoryProducts[0]?.category || "No Products Found"}
      </h1>

      {/* SEARCH PAUSED */}

      {/* 
            {
                categoryProducts.length > 0 && (

                    <div className="flex justify-center mb-10">

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="input input-bordered w-full max-w-md"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />

                    </div>
                )
            } 
            */}

      {categoryProducts.length === 0 ? (
        <div className="flex flex-col items-center text-sky-400 mt-20">
          <p className="text-xl">Will be available soon!</p>
        </div>
      ) : (
        <ProductDisplay products={categoryProducts} />
      )}
    </div>
  );
};

export default CategoryPage;
