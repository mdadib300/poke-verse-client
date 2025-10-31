import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useProducts from "../../../hooks/useProducts";
import Title from "../../../Components/TItle/Title";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const ManageProducts = () => {
    const [products, , refetch] = useProducts();
    const axiosSecure = useAxiosSecure();
    const handleDeleteProduct = (product) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            showCancelButton: true,
            confirmButtonColor: "#262626",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/products/${product._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted",
                        text: "Your product has been deleted.",
                        confirmButtonColor: "#262626"
                    });
                }
            }
        });
    }
    return (
        <div>
            <Title heading="Manage Products"></Title>
            <div className="px-5 lg:px-30">
                <div className="overflow-x-auto text-sky-400">
                    <table className="table">
                        <tbody>
                            {
                                products.slice().reverse().map(product =>
                                    <tr className="border-y-2 border-sky-300" key={product._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={product.imageLink}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.title}</div>
                                                    <div className="text-sm">{product.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Price: {product.price} BDT
                                            <br />
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/updateProduct/${product._id}`}>
                                                <button className="btn btn-ghost btn-circle text-xl"><FaEdit></FaEdit></button>
                                            </Link>
                                        </td>
                                        <th>
                                            <button onClick={() => handleDeleteProduct(product)} className="btn btn-ghost btn-circle text-xl"><MdDelete /></button>
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

export default ManageProducts;