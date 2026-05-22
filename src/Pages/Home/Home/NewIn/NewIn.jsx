import ProductDisplay from "../../../../Components/ProductDisplay/ProductDisplay";
import Title from "../../../../Components/TItle/Title";
import useLimitedProducts from "../../../../hooks/useLimitedProducts";

const NewIn = () => {
  const [products, loading] = useLimitedProducts();

  return (
    <div className="bg-white mb-30">
      <div className="flex justify-center">
        <Title heading={"New Arrivals"} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner text-info"></span>
        </div>
      ) : (
        <ProductDisplay products={products} />
      )}
    </div>
  );
};

export default NewIn;
