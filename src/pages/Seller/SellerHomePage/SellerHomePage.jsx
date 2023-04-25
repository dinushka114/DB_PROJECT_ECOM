import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AdminNav from '../../../components/Admin/AdminNav/AdminNav'
import SellerSideNav from '../../../components/Seller/SellerSideNav/SellerSideNav'
import SellerHomeContent from '../../../components/Seller/SellerHomeContent/SellerHomeContent';
import SellerAddCategory from '../../../components/Seller/SellerAddCategory/SellerAddCategory';
import ManageProducts from '../../../components/Seller/ManageProducts/ManageProducts';
import UpdateProduct from '../../../components/Seller/UpdateProduct/UpdateProduct';

const SellerHomePage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!checkAuth()) {
            navigate("/seller-login")
        }

    }, [])

    const checkAuth = () => {
        return localStorage.getItem("userName") != null;
    }

    return (
        <>
            <AdminNav />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <SellerSideNav />
                </div>
                <div id="layoutSidenav_content">
                    <Routes>
                        <Route path='/' element={<SellerHomeContent />} />
                        <Route path='/manage-category' element={<SellerAddCategory />} />
                        <Route path='/manage-product' element={<ManageProducts />} />
                        <Route path='/update-product/:id' element={<UpdateProduct />} />
                        <Route path='/edit/:id' element={<ManageProducts />} />

                    </Routes>
                </div>
            </div>
        </>
    )
}

export default SellerHomePage