import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../Components/TItle/Title";

const ManageCoupons = () => {
    const axiosSecure = useAxiosSecure();
    const [coupons, setCoupons] = useState([]);

    const fetchCoupons = async () => {
        const res = await axiosSecure.get("/coupons");
        setCoupons(res.data);
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Delete this coupon?",
            text: "Customers won't be able to use it anymore.",
            showCancelButton: true,
            confirmButtonColor: "#262626",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/coupons/${id}`);
                Swal.fire("Deleted!", "Coupon removed successfully.", "success");
                fetchCoupons();
            }
        });
    };

    return (
        <div className="px-5 lg:px-30 min-h-screen">
            <Title heading="Manage Coupons"></Title>
            <div className="overflow-x-auto mt-4">
                <table className="table text-sky-400">
                    <tbody>
                        {
                            coupons.slice().reverse().map(coupon =>
                                <tr className="border-y-1 border-sky-400" key={coupon._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">Coupon Code - {coupon.code}</div>
                                                <div className="text-sm">Discount - {coupon.discountPercent}%</div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <button
                                            onClick={() => handleDelete(coupon._id)}
                                            className="btn btn-ghost btn-circle text-xl"
                                        >
                                            <MdDelete />
                                        </button>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCoupons;
