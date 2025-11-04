import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Title from "../../../Components/TItle/Title";
import { MdDelete } from "react-icons/md";
import useAdmin from "../../../hooks/useAdmin";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [isAdmin, isAdminLoading, refetchAdmin] = useAdmin();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    const handleRemove = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            showCancelButton: true,
            confirmButtonColor: "#262626",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted",
                                text: "User has been deleted.",
                                confirmButtonColor: "#262626"
                            });
                        }
                    })
            }
        });
    }

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are making ${user.name} the admin of Poke Verse Website`,
            showCancelButton: true,
            confirmButtonColor: "#262626",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make Admin"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            refetchAdmin();
                            Swal.fire({
                                title: "Done",
                                text: `${user.name} is now the admin of XPoint Website`,
                                confirmButtonColor: "#262626"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className="text-sky-400 px-5 lg:px-30 min-h-screen">
            <Title heading="All Users"></Title>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <tbody>
                            {
                                users.slice().reverse().map(user =>
                                    <tr className="border-b-2 border-sky-400" key={user._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-bold">{user.name}</div>
                                                    <div className="text-sm">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-xs">Make Admin</button>
                                            }

                                        </td>
                                        <th>
                                            <button onClick={() => handleRemove(user)} className="btn btn-ghost btn-circle text-xl"><MdDelete /></button>
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

export default Users;