import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
import Swal from 'sweetalert2';
import { Carousel } from 'react-responsive-carousel';
import Categories from '../../Pages/Home/Home/Categories/Categories';

const ProductDetails = () => {
    const product = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();

        if (user && user.email) {
            const quantity = e.target.quantity.value;
            const finalPrice = product.price * quantity;
            const cartItem = {
                productId: product._id,
                title: product.title,
                quantity,
                price: finalPrice,
                email: user.email,
                image: product.images[0],
                category: product.category,
                size: e.target.size.value,
                color: e.target.color.value,
            };

            axiosSecure.post('/carts', cartItem).then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: `${product.title} added to your cart`,
                        confirmButtonText: 'Okay',
                        customClass: {
                            confirmButton: 'bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded',
                        },
                        buttonsStyling: false,
                    });
                    refetch();
                    e.target.reset();
                }
            });
        } else {
            Swal.fire({
                title: `Please login first`,
                confirmButtonText: 'Okay',
                customClass: {
                    confirmButton: 'bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded',
                },
                buttonsStyling: false,
            });
            navigate('/login', { state: { from: location } });
        }
    };

    const handleOrderNow = (e) => {
        e.preventDefault();

        if (!user || !user.email) {
            Swal.fire({
                title: `Please login first`,
                confirmButtonText: 'Okay',
                customClass: {
                    confirmButton: 'bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded',
                },
                buttonsStyling: false,
            });
            navigate('/login', { state: { from: location } });
            return;
        }

        // Get form values
        const form = e.target.closest('form');
        const quantity = form.quantity.value;
        const size = form.size.value;
        const color = form.color.value;

        // Build product info
        const finalPrice = product.price * quantity;
        const orderItem = {
            productId: product._id,
            title: product.title,
            quantity,
            price: finalPrice,
            imageLink: product.imageLink,
            category: product.category,
            size,
            color,
        };

        // Navigate directly to checkout with order info
        navigate('/dashboard/checkout', { state: { orderNowItem: orderItem } });
    }

    return (
        <div>
            <div className="hero mt-0 lg:mt-10 mb-2 text-sky-400">
                <div className="hero-content flex-col lg:flex-col items-start gap-8">
                    <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
                        <div className="w-full lg:w-1/2">
                            <Carousel
                                autoPlay={false}
                                interval={5000}
                                infiniteLoop={true}
                                stopOnHover={false}
                                showThumbs={false}
                                showStatus={false}
                                swipeable={true}
                                emulateTouch={true}
                                className="w-full"
                            >
                                {product.images.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={image}
                                            className="w-full aspect-square object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <h1 className="text-3xl font-bold mb-3">{product.title}</h1>

                            <div className="py-3 space-y-1">
                                <p className="text-xl">
                                    <b>Product Type:</b> {product.category}
                                </p>
                                <p className="text-xl">
                                    <b>Sizes:</b>{" "}
                                    {product.sizes?.map((size) => (
                                        <span key={size}>{size} | </span>
                                    ))}
                                </p>
                                <p className="text-xl">
                                    <b>Colors:</b>{" "}
                                    {product.colors?.map((color) => (
                                        <span key={color}>{color} | </span>
                                    ))}
                                </p>
                                <p className="text-xl">
                                    <b>Price:</b> {product.price} BDT
                                </p>
                            </div>

                            <div className="mt-4">
                                <form onSubmit={handleAddToCart} className="space-y-2">
                                    <fieldset className="fieldset">
                                        <label className="block text-sky-400 font-medium mt-2">Size</label>
                                        <select
                                            defaultValue=""
                                            className="select bg-white border border-sky-400 w-full"
                                            name="size"
                                        >
                                            <option disabled value="">
                                                Select Size (If applicable)
                                            </option>
                                            {product.sizes?.map((size) => (
                                                <option key={size}>{size}</option>
                                            ))}
                                        </select>

                                        <label className="block text-sky-400 font-medium mt-2">
                                            Select the color
                                        </label>
                                        <select
                                            defaultValue=""
                                            className="select bg-white border border-sky-400 w-full"
                                            name="color"
                                        >
                                            <option disabled value="">
                                                Select Color (If applicable)
                                            </option>
                                            {product.colors?.map((color) => (
                                                <option key={color}>{color}</option>
                                            ))}
                                        </select>

                                        <label className="block text-sky-400 font-medium mt-2">
                                            Quantity
                                        </label>
                                        <input
                                            required
                                            defaultValue={1}
                                            type="number"
                                            className="input bg-white border border-sky-400 w-full"
                                            name="quantity"
                                        />

                                        <input
                                            type="submit"
                                            value="Add to Cart"
                                            className="btn btn-info hover:text-white btn-outline btn-wide mt-3"
                                        />
                                        <p>Or,</p>
                                        <button
                                            onClick={(e) => handleOrderNow(e)}
                                            className="btn btn-info hover:text-white btn-outline btn-wide"
                                        >
                                            Order Now
                                        </button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="text-sky-400 text-xl w-full lg:w-1/2">
                        <p className="font-bold mb-2">Description</p>
                        <p>{product?.description}</p>
                    </div>
                </div>

            </div>
            <div>
                <Categories></Categories>
            </div>
        </div>

    );
};

export default ProductDetails;