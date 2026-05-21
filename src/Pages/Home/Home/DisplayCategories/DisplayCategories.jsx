import { Link } from "react-router-dom";

import Title from "../../../../Components/TItle/Title";
import createSlug from "../../../../utils/CreateSlug";
import useCategories from "../../../../hooks/useCategories";

const DisplayCategories = () => {
  const [categories, loading] = useCategories();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  return (
    <div className="my-20" id="categories">
      <Title heading="Discover by Category" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 lg:px-20">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${createSlug(category.category)}`}
          >
            <div className="border border-sky-300 rounded-xl p-10 text-center text-sky-400 hover:bg-sky-100 transition-all duration-300 h-32 flex items-center justify-center">
              <h2 className="text-xl font-semibold">{category.category}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DisplayCategories;
