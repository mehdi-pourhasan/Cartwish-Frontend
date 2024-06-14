/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router-dom'


import LoginPage from "../Auth/LoginPage";
import MyOrdersPage from "../Order/MyOrdersPage";
import CartPage from "../Cart/CartPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SignupPage from "../Auth/SignupPage";
import Logout from '../Auth/Logout';
import ProtectedRoute from './ProtectedRoute';



const Routing = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/product/:id' element={<SingleProductPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path='/cart' element={<CartPage />} />
                <Route path='/myorders' element={<MyOrdersPage />} />
                <Route path='/logout' element={<Logout />} />
            </Route>
        </Routes>


    )
}

export default Routing