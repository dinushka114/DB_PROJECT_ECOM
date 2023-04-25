import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AdminNav from '../../components/Admin/AdminNav/AdminNav'
import AdminSideNav from '../../components/Admin/AdminSideNav/AdminSideNav'
import AdminHomeContent from '../../components/Admin/AdminHomeContent/AdminHomeContent'
import "./Admin.css"
import CheckOrdersPage from '../../components/Admin/CheckOrders/CheckOrdersPage';

const AdminHome = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!checkAuth()) {
            navigate("/admin-login")
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
                    <AdminSideNav />
                </div>
                <div id="layoutSidenav_content">
                    <Routes>
                        <Route path='/' element={<AdminHomeContent />} />
                        <Route path='/check-orders' element={<CheckOrdersPage />} />

                    </Routes>
                </div>
            </div>
        </>
    )
}

export default AdminHome