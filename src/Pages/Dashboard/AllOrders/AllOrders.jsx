import Swal from "sweetalert2";
import useAllOrders from "../../../hooks/useAllOrders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../Components/TItle/Title";

const AllOrders = () => {
    const [orders, refetch] = useAllOrders();
    const axiosSecure = useAxiosSecure();

    const handleStatusChange = async (id, newStatus) => {
        const res = await axiosSecure.patch(`/orders/${id}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                title: "Success",
                text: `Order marked as ${newStatus}`,
                confirmButtonColor: "#262626"
            });
            refetch();
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will delete the order permanently!",
            showCancelButton: true,
            confirmButtonColor: "#262626",
            cancelButtonColor: "#862222ff",
            confirmButtonText: "Yes"
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.delete(`/orders/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire({
                    title: "Deleted",
                    text: "The order has been removed.",
                    confirmButtonColor: "#262626"
                });
                refetch();
            }
        }
    };

    return (
        <div className="text-sky-500 px-5 lg:px-30 min-h-screen">
            <Title heading="All Orders"></Title>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <tbody>
                            {
                                orders.slice().reverse().map(order =>
                                    <tr key={order._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <p>Name: {order.name}</p>
                                                    <p>Phone: {order.phone}</p>
                                                    <p>Email: {order.email}</p>
                                                    <p>Address: {order.address}</p>
                                                    <p>Delivery Location: {order.deliveryLocation}</p>
                                                    <p>Ordered at: {order.orderTime.slice(0, 10)}</p>
                                                    <p>Payment Method: {order.paymentMethod}</p>
                                                    <p>Discount: {order.discountPercent}%</p>
                                                    <p>Total Amount: {order.amount} BDT</p>
                                                    <p>Order Status: {order.status}</p>
                                                </div>
                                                <div>
                                                    {
                                                        order.cartItems.map(cartItem => <div>
                                                            <p>Product: {cartItem.title}</p>
                                                            <p>Category: {cartItem.category}</p>
                                                            <p>Size: {cartItem.size}</p>
                                                            <p>Color: {cartItem?.color}</p>
                                                            <p>Price: {cartItem.price}</p>
                                                            <p>Qty: {cartItem.quantity}</p>
                                                            <hr />
                                                            <br />
                                                        </div>)
                                                    }
                                                </div>
                                            </div>
                                            <hr />
                                        </td>
                                        <th>
                                            <button
                                                className="btn btn-success me-5"
                                                onClick={() => handleStatusChange(order._id, "Confirmed")}
                                                disabled={order.status !== "Pending"}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                className="btn btn-error me-5"
                                                onClick={() => handleStatusChange(order._id, "Canceled")}
                                                disabled={order.status !== "Pending"}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-outline"
                                                onClick={() => handleDelete(order._id)}
                                            >
                                                Delete
                                            </button>
                                        </th>

                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllOrders;