import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";


const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <p>Loading....</p>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoute;

// import { useContext } from "react";
// import useAdmin from "../Hooks/useAdmin";
// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProvider";


// const AdminRoute = ({children}) => {
//     const { user, loading } = useContext(AuthContext);
//     const [isAdmin, isAdminLoading] = useAdmin();
//     const location = useLocation();
//     if (loading || isAdminLoading) {
//         return <div className="flex justify-center my-25 md:my-50">
//             <span className="loading loading-ring loading-xl"></span>
//         </div>
//     }
//     if (user && isAdmin) {
//         return children;
//     }
//     return <Navigate to="/" state={{ from: location }} replace></Navigate>
// };

// export default AdminRoute;