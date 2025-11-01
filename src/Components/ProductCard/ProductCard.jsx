import { Link } from "react-router-dom";


const ProductCard = ({ productInfo }) => {

    const { _id, title, category, price, images } = productInfo;

    return (
        <Link to={`/product/${_id}`} className="block">
            <div className="card bg-white text-sky-400 w-40 md:w-60 shadow-xl hover:scale-101 transition-transform duration-200 h-full">
                <figure>
                    <img src={images[0]} className="h-40 w-40 md:h-60 md:w-60" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>Category - <Link to={`/category/${category}`}>{category}</Link></p>
                    <p>Price - {price} BDT</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;