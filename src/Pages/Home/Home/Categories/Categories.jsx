import ProductCard from "../../../../Components/ProductCard/ProductCard";
import Title from "../../../../Components/TItle/Title";
import useLimitedProducts from "../../../../hooks/useLimitedProducts";

const Categories = () => {
  const [products, loading] = useLimitedProducts();
  const sortedProducts = [...products].reverse();

  return (
    <div>
      <div className="flex justify-center">
        <Title heading={"Discover Other Products"}></Title>
      </div>

      {/* LOADING SPINNER */}
      {loading ? (
        <div className="flex justify-center items-center mb-20">
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
      ) : (
        <div className="flex justify-center mb-20">
          <div
            className="
            grid [@media(max-width:860px)]:grid-cols-2 [@media(max-width:1365px)]:grid-cols-3 lg:grid-cols-4 
            gap-2 [@media(max-width:860px)]:gap-2 [@media(max-width:1365px)]:gap-10 lg:gap-15
          "
          >
            {sortedProducts.map((product, id) => (
              <ProductCard key={id} productInfo={product}></ProductCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
