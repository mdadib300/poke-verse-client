import { Link } from "react-router-dom";


const ProductCard = ({ productInfo }) => {

    const { _id, title, category, price, imageLink } = productInfo;

    return (
        <Link to={`/product/${_id}`} className="block">
            <div className="card bg-white text-sky-400 w-70 lg:w-85 shadow-2xl hover:scale-101 transition-transform duration-200 h-full">
                <figure>
                    <img src={imageLink} className="h-70 w-70 lg:h-85 lg:w-85" />
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