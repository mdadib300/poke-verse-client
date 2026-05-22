import ProductDisplay from "../../../../Components/ProductDisplay/ProductDisplay";
import Title from "../../../../Components/TItle/Title";
import useProducts from "../../../../hooks/useProducts";
import useCategories from "../../../../hooks/useCategories";

const AllCategoryProducts = () => {

  const [products, loading] = useProducts();
  const [categories] = useCategories();

  // ONLY KEEP CATEGORIES THAT HAVE PRODUCTS
  const categoriesWithProducts = categories.filter((category) => {

    const categoryProducts = products.filter(
      product => product.category === category.category
    );

    return categoryProducts.length > 0;
  });

  return (
    <div className="bg-white mb-30 px-5 lg:px-10">

      {
        loading ? (

          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-info"></span>
          </div>

        ) : (

          <div className="space-y-20">

            {
              categoriesWithProducts.map((category) => {

                // FILTER PRODUCTS OF CURRENT CATEGORY
                const categoryProducts = products.filter(
                  product => product.category === category.category
                );

                return (

                  <div key={category._id}>

                    {/* CATEGORY TITLE */}
                    <h2 className="text-3xl text-center text-sky-400 font-bold mb-10">
                      {category.category}
                    </h2>

                    {/* PRODUCTS */}
                    <ProductDisplay products={categoryProducts} />

                  </div>

                );
              })
            }

          </div>

        )
      }

    </div>
  );
};

export default AllCategoryProducts;