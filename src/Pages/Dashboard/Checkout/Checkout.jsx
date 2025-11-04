
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../Components/TItle/Title";
import { useLocation, useNavigate } from "react-router-dom";


const Checkout = () => {

    const { user } = useContext(AuthContext);
    const [cart] = useCart();
    const [deliveryCharge, setDeliveryCharge] = useState(100);
    const [discount, setDiscount] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();


    const orderNowItem = location.state?.orderNowItem;

    const items = orderNowItem ? [orderNowItem] : cart;

    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    const discountedPrice = totalPrice - (totalPrice * discount) / 100;
    const finalPrice = discountedPrice + deliveryCharge;

    const handleApplyCoupon = async () => {
        if (!couponCode) {
            Swal.fire("Enter a coupon code first!", "", "warning");
            return;
        }

        try {
            const res = await axiosSecure.get(`/coupon/${couponCode}`);
            setDiscount(res.data.discountPercent);
            Swal.fire({
                title: "Coupon Applied!",
                text: `You got ${res.data.discountPercent}% off! 🎉`,
                confirmButtonColor: "#262626",
            });
        } catch (err) {
            setDiscount(0);
            Swal.fire("Invalid Coupon", "Please enter a valid code.", "error");
        }
    };

    const handlePlaceOrder = e => {
        e.preventDefault();
        const form = e.target;
         const order = {
            name: form.name.value,
            email: user.email,
            phone: form.phoneNumber.value,
            address: form.address.value,
            deliveryLocation: form.deliveryLocation.value,
            amount: finalPrice,
            discountPercent: discount,
            appliedCoupon: couponCode,
            paymentMethod: form.paymentMethod.value,
            cartItems: items,
            status: "Pending",
            orderTime: new Date(),
        };
        Swal.fire({
            title: "Confirm Placing the order? If confirm, please wait till confirmation alert.",
            showCancelButton: true,
            confirmButtonColor: "#262626",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post("/orders", order)
                    .then(res => {
                        if (res.data.insertedId) {
                            form.reset();
                            Swal.fire({
                                title: "Order Placed",
                                confirmButtonColor: "#262626"
                            });
                            navigate('/dashboard/orders');

                        }
                    })
            }
        });
    }

    const handlePaymentMethod = (e) => {
        const selected = e.target.value;
        if (selected === "Cash On Delivery") {
            Swal.fire({
                title: "Important Alert!",
                text: "Cash On Delivery Selected, Please check after some times that your order is confirmed or not.",
                confirmButtonColor: "#262626"
            });
        }
    }

    const handleDeliveryLocation = (e) => {
        const selected = e.target.value;
        if (selected === "Inside Dhaka") {
            setDeliveryCharge(60);
        } else if (selected === "Suburbs Dhaka") {
            setDeliveryCharge(80);
        } else if (selected === "Outside Dhaka") {
            setDeliveryCharge(100);
        }
    };

    return (
        <div>
            <Title heading="Checkout"></Title>
            <div className="flex items-center justify-center w-full lg:w-4/6 p-5 mx-auto">
                <form onSubmit={handlePlaceOrder} className="space-y-4 w-full flex flex-col justify-center">
                    <label className="block text-sky-400 font-medium">Your Full Name</label>
                    <input
                        type="text"
                        name='name'
                        placeholder="Full Name"
                        required
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                    />
                    <label className="block text-sky-400 font-medium">Your Phone Number</label>
                    <input
                        type="text"
                        name='phoneNumber'
                        placeholder="Phone Number"
                        required
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                    />
                    <label className="block text-sky-400 font-medium">Your Full address</label>
                    <input
                        type="text"
                        name='address'
                        placeholder="Address"
                        required
                        className="w-full rounded-lg border border-sky-300 bg-sky-50 text-sky-400 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 p-3"
                    />
                    <label className="block text-sky-400 font-medium">Delivery Location</label>
                    <select required defaultValue="Select Delivery Location" className="select bg-white text-sky-400 border-1 border-sky-400" name="deliveryLocation" onChange={handleDeliveryLocation}>
                        <option disabled >Select Delivery Location</option>
                        <option>Inside Dhaka</option>
                        <option>Suburbs Dhaka</option>
                        <option>Outside Dhaka</option>
                    </select>
                    <div className="mt-3">
                        <label className="block text-sky-400 font-medium">Have a Coupon?</label>
                        <div className="flex gap-2 mt-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="Enter Coupon Code"
                                className="input border border-sky-300 bg-sky-50 text-sky-400 flex-1"
                            />
                            <button
                                type="button"
                                onClick={handleApplyCoupon}
                                className="px-4 py-2 border border-sky-400 bg-sky-100 text-sky-400 font-medium hover:bg-sky-400 hover:text-white rounded-lg"
                            >
                                Apply
                            </button>
                        </div>
                        {discount > 0 && (
                            <p className="mt-2 text-green-600 font-medium">
                                ✅ {discount}% discount applied!
                            </p>
                        )}
                    </div>
                    <p className="font-bold mt-2 text-sky-400">
                        Subtotal: {totalPrice} BDT <br />
                        Discount: {discount}% (-{(totalPrice * discount) / 100} BDT) <br />
                        Delivery: {deliveryCharge} BDT <br />
                        <b>Total to Pay: {finalPrice} BDT</b>
                    </p>
                    <label className="block text-sky-400 font-medium">Select Payment Method</label>
                    <select required defaultValue="" className="select bg-white text-sky-400 border-1 border-sky-400" name="paymentMethod" onChange={handlePaymentMethod}>
                        <option disabled value="">Select Payment Method</option>
                        <option>Cash On Delivery</option>
                        {/* <option>Online Payment</option> */}
                    </select>
                    <input type="submit" value="Place Order" className="mt-2 px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white" />
                </form>
            </div>
        </div>
    );
};

export default Checkout;