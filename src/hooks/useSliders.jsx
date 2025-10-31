import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSliders = () => {
    const axiosPublic = useAxiosPublic();

    const {data: sliders=[], isPending: loading, refetch} = useQuery({
        queryKey: ['sliders'],
        queryFn: async() => {
            const res = await axiosPublic.get('/sliders');
            return res.data;
        }
    })

    return [sliders, loading, refetch]
};

export default useSliders;