import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        }
    });

    return [orders, refetch];
};

export default useOrders;