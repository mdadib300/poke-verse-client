import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Main from './Layout/Main.jsx'
import Home from './Pages/Home/Home/Home.jsx'
import TShirts from './Pages/Home/TShirts/TShirts.jsx'
import Login from './Pages/Home/Login/Login.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import SignUp from './Pages/Home/SignUp/SignUp.jsx'
import Secret from './Pages/Shared/Secret/Secret.jsx'
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import Dashboard from './Layout/Dashboard.jsx'
import Cart from './Pages/Dashboard/Cart/Cart.jsx'
import Orders from './Pages/Dashboard/Orders/Orders.jsx'
import Users from './Pages/Dashboard/Users/Users.jsx'
import AddProducts from './Pages/Dashboard/AddProducts/AddProducts.jsx'
import AdminRoute from './Pages/Home/AdminRoute/AdminRoute.jsx'
import ManageProducts from './Pages/Dashboard/ManageProducts/ManageProducts.jsx'
import UpdateProduct from './Pages/Dashboard/UpdateProduct/UpdateProduct.jsx'
import Checkout from './Pages/Dashboard/Checkout/Checkout.jsx'
import AllOrders from './Pages/Dashboard/AllOrders/AllOrders.jsx'
import AddSlider from './Pages/Dashboard/AddSlider/AddSlider.jsx'
import ManageSliders from './Pages/Dashboard/ManageSliders/ManageSliders.jsx'
import CategoryPage from './Pages/Home/Home/CategoryPage/CategoryPage.jsx'
import AddCoupon from './Pages/Dashboard/AddCoupon/AddCoupon.jsx'
import ManageCoupons from './Pages/Dashboard/ManageCoupons/ManageCoupons.jsx'
import Profile from './Pages/Dashboard/Profile/Profile.jsx'
import About from './Pages/Home/About/About.jsx'
import Contact from './Pages/Home/Contact/Contact.jsx'
import AddCategory from './Pages/Dashboard/AddCategory/AddCategory.jsx'
import Categories from './Pages/Home/Home/Categories/Categories.jsx'
import Policy from './Pages/Home/Policy/Policy.jsx'

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/secret',
        element: <PrivateRoute><Secret></Secret></PrivateRoute>
      },
      {
        path: '/product/:id',
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) => fetch(`https://poke-verse-server.vercel.app/products/${params.id}`)
      },
      {
        path: '/category/:categoryName',
        element: <CategoryPage></CategoryPage>
      },
      {
        path: '/allproductandcategories',
        element: <Categories></Categories>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/policy',
        element: <Policy></Policy>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'checkout',
        element: <Checkout></Checkout>
      },
      {
        path: 'users',
        element: <Users></Users>
      },
      {
        path: 'addcategory',
        element: <AdminRoute><AddCategory></AddCategory></AdminRoute>
      },
      {
        path: 'addproducts',
        element: <AdminRoute><AddProducts></AddProducts></AdminRoute>
      },
      {
        path: 'addslider',
        element: <AdminRoute><AddSlider></AddSlider></AdminRoute>
      },
      {
        path: 'managesliders',
        element: <AdminRoute><ManageSliders></ManageSliders></AdminRoute>
      },
      {
        path: 'addcoupon',
        element: <AdminRoute><AddCoupon></AddCoupon></AdminRoute>
      },
      {
        path: 'managecoupons',
        element: <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>
      },
      {
        path: 'manageproducts',
        element: <AdminRoute><ManageProducts></ManageProducts></AdminRoute>
      },
      {
        path: 'updateproduct/:id',
        element: <AdminRoute><UpdateProduct></UpdateProduct></AdminRoute>,
        loader: ({params})=>fetch(`https://poke-verse-server.vercel.app/products/${params.id}`)
      },
      {
        path: 'allorders',
        element: <AdminRoute><AllOrders></AllOrders></AdminRoute>
      },
      {
        path: 'orders',
        element: <Orders></Orders>
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
