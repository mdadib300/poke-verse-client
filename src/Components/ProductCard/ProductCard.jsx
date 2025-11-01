import { Link } from "react-router-dom";


const ProductCard = ({ productInfo }) => {

    const { _id, title, category, price, images } = productInfo;

    return (
        <Link to={`/product/${_id}`} className="block">
            <div className="card bg-white text-sky-400 [@media(max-width:340px)]:w-35 w-40 md:w-60 lg:w-70 shadow-xl hover:scale-101 transition-transform duration-200 h-full">
                <figure>
                    <img src={images[0]} className="[@media(max-width:340px)]:w-35 [@media(max-width:340px)]:h-35 h-40 md:h-60 lg:h-70 w-40  md:w-60 lg:w-70" />
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