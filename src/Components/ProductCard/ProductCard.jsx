import { Link } from "react-router-dom";

const ProductCard = ({ productInfo }) => {
  const { _id, title, category, price, images, orderType, releaseDate } =
    productInfo;

  return (
    <Link to={`/product/${_id}`} className="block">
      <div className="card bg-white text-sky-400 [@media(max-width:340px)]:w-35 w-40 md:w-60 lg:w-70 shadow-xl hover:scale-101 transition-transform duration-200 h-full">
        <figure className="relative">
          <img
            src={images[0]}
            className="[@media(max-width:340px)]:w-35 [@media(max-width:340px)]:h-35 h-40 md:h-60 lg:h-70 w-40 md:w-60 lg:w-70"
          />

          {orderType === "Pre-Order" && (
            <div className="absolute top-2 left-2 badge badge-warning text-white font-semibold p-3">
              Pre-Order Available
            </div>
          )}

          {orderType === "Out of Stock" && (
            <div className="absolute top-2 left-2 badge badge-error text-white font-semibold p-3">
              Out of Stock
            </div>
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>
            Category - <Link to={`/category/${category}`}>{category}</Link>
          </p>
          <p>Price - {price} BDT</p>

          {orderType === "Pre-Order" && (
            <p className="text-warning font-semibold">Release: {releaseDate}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
