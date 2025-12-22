import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
        baseURL: 'https://poke-verse-server.vercel.app/'
    })

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useAuth();
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('Request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async (error)=>{
        const status = error.response.status;
        console.log('Status error in the interceptor', status);
        if(status === 401 || status ===403){
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;

// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

// export const axiosSecure = axios.create({
//     baseURL: "https://poke-verse-server.vercel.app/",
// });

// const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     const { logOut } = useAuth();

//     useEffect(() => {
//         const reqInterceptor = axiosSecure.interceptors.request.use(
//             (config) => {
//                 const token = localStorage.getItem("access-token");
//                 if (token) {
//                     config.headers.authorization = `Bearer ${token}`;
//                 }
//                 return config;
//             },
//             (error) => Promise.reject(error)
//         );

//         const resInterceptor = axiosSecure.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 const status = error.response?.status;
//                 console.log("Interceptor error status:", status);

//                 if (status === 401 || status === 403) {
//                     await logOut();
//                     navigate("/login");
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         // 🧹 CLEANUP (VERY IMPORTANT)
//         return () => {
//             axiosSecure.interceptors.request.eject(reqInterceptor);
//             axiosSecure.interceptors.response.eject(resInterceptor);
//         };
//     }, [logOut, navigate]);

//     return axiosSecure;
// };

// export default useAxiosSecure;
