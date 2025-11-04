// CategoryPage.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useProducts from "../../../../hooks/useProducts";
import Title from "../../../../Components/TItle/Title";
import ProductDisplay from "../../../../Components/ProductDisplay/ProductDisplay";

const DisplayCategoryProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products] = useProducts(); // assuming this returns [products]

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/categories");
        if (mounted) {
          setCategories(res.data || []);
        }
      } catch (err) {
        console.error("Failed fetching categories", err);
        if (mounted) {
          setError("Failed to load categories");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      mounted = false;
    };
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  // Filter only categories that have products
  const categoriesWithProducts = categories.filter((cat) => {
    const categoryName = cat.category || cat.name || "Unnamed";
    const categoryProducts = products.filter((p) => p.category === categoryName);
    return categoryProducts.length > 0;
  });

  return (
    <div className="space-y-12 px-4 md:px-8 lg:px-16 py-8">
      <Title heading="Discover Our Products" />

      {categoriesWithProducts.length === 0 && (
        <p className="text-center text-slate-400">No categories with products found.</p>
      )}

      {categoriesWithProducts.map((cat) => {
        const categoryName = cat.category || cat.name || "Unnamed";
        const categoryProducts = products.filter(
          (p) => p.category === categoryName
        );

        return (
          <section key={cat._id ?? categoryName} className="pt-4">
            <h2 className="text-3xl text-center font-semibold text-sky-400 mb-7">
              {categoryName}
            </h2>
            <ProductDisplay products={categoryProducts} />
          </section>
        );
      })}
    </div>
  );
};

export default DisplayCategoryProducts;
