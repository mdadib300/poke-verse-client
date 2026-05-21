import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useLimitedProducts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: products = [], isPending: loading } = useQuery({
    queryKey: ["limitedProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products?limit=16");
      return res.data;
    },
  });

  return [products, loading];
};

export default useLimitedProducts;
