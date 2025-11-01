import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../Components/TItle/Title";
import { MdDelete } from "react-icons/md";


const Cart = () => {

    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleRemove = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "This will remove the product from the cart",
            showCancelButton: true,
            confirmButtonColor: "#262626",
            cancelButtonColor: "#862222ff",
            confirmButtonText: "Yes"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/carts/${id}`)
                        .then(res => {
                            console.log(res);
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Done",
                                    text: "Product removed from the cart",
                                    confirmButtonColor: "#262626",
                                });
                            }
                        })
                }
            });
    }

    return (
        <div className="text-black px-5 lg:px-30">
            <h1 className="text-2xl"></h1>
            <div>
                <Title heading="Your Cart"></Title>
                <div className="text-sky-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl">Total Items: {cart.length}</h2>
                            <h2 className="text-xl">Total Price: {totalPrice} BDT</h2>
                        </div>
                        <div>
                            <Link to="/dashboard/checkout"><button className="px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white">Checkout</button></Link>
                        </div>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <tbody>
                                    {
                                        cart.slice().reverse().map(cartProduct =>
                                            <tr className="border-b-1 border-sky-400" key={cartProduct._id}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img
                                                                    src={cartProduct.image} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{cartProduct.title}</div>
                                                            <div className="text-sm">{cartProduct.category}</div>
                                                            <div className="text-sm">Size: {cartProduct.size}</div>
                                                            <div className="text-sm">Color: {cartProduct.color}</div>
                                                            <div className="text-sm">Qty: {cartProduct.quantity}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Price: {cartProduct.price} BDT</td>
                                                <th>
                                                    <button onClick={() => handleRemove(cartProduct._id)} className="btn btn-ghost btn-circle text-xl"><MdDelete></MdDelete></button>
                                                </th>
                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;