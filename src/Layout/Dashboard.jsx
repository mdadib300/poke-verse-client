import { Link, NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css';
import useAdmin from '../hooks/useAdmin';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import logo from '../assets/logo.png';

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const { logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    return (
        <div>
            {/* Dashboard Navigation Bar */}
            <div>
                <div className="navbar bg-white text-sky-400 shadow-sm px-5 lg:px-30">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {
                                    isAdmin ?
                                        <>
                                            <li><NavLink to='/'>Home</NavLink></li>
                                            <li><NavLink to='/dashboard/addcategory'>Add Category</NavLink></li>
                                            <li><NavLink to='/dashboard/addproducts'>Add Products</NavLink></li>
                                            <li><NavLink to='/dashboard/manageproducts'>Manage Products</NavLink></li>
                                            <li><NavLink to='/dashboard/users'>Users</NavLink></li>
                                            <li><NavLink to='/dashboard/allorders'>Orders</NavLink></li>
                                            <li><NavLink to='/dashboard/addslider'>Add Slider Image</NavLink></li>
                                            <li><NavLink to='/dashboard/managesliders'>Manage Slider Images</NavLink></li>
                                            <li><NavLink to='/dashboard/addcoupon'>Add Coupon</NavLink></li>
                                            <li><NavLink to='/dashboard/managecoupons'>Manage Coupons</NavLink></li>
                                        </>
                                        :
                                        <>
                                            <li><NavLink to='/'>Home</NavLink></li>
                                            <li><NavLink to='/dashboard/cart'>Cart</NavLink></li>
                                            <li><NavLink to='/dashboard/orders'>Orders</NavLink></li>
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <Link to='/' className="w-30 m-2"><img src={logo} /></Link>
                    </div>
                    <div className="navbar-end">
                        <button onClick={handleLogOut} className="px-4 py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;