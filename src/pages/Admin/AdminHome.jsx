import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AdminNav from '../../components/Admin/AdminNav/AdminNav'
import AdminSideNav from '../../components/Admin/AdminSideNav/AdminSideNav'
import AdminHomeContent from '../../components/Admin/AdminHomeContent/AdminHomeContent'
import "./Admin.css"
import CheckOrdersPage from '../../components/Admin/CheckOrders/CheckOrdersPage';
import ManageDelivery from '../../components/Admin/ManageDelivery/ManageDelivery';
import axios from "axios"

const AdminHome = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('Pending')
    let total = 0;
    let commis = 0;

    orders.map(order => {
        total = total + Number(order.price)
        if (order.commis != undefined) {
            commis = commis + Number(order.commis)
        }
    })

    console.log(total)

    const statusHandler = (e) => {
        let status = e.target.value;
        if (status !== "Select status") {
            // alert(status)
            setStatus(status)
        }
    }

    const updateStatus = async (id) => {
        await axios.post("http://localhost:4005/api/change-order-status", { order_id: id, status })
            .then(res => {
                getAllOrders()
            })
            .catch(err => {
                alert("Err")
            })

    }

    const getAllOrders = async () => {
        setLoading(true)
        await axios.get("http://localhost:4005/api/get-all-orders")
            .then(res => {
                setOrders(res.data.orders)
                setLoading(false)

            })
            .catch(err => {
                alert("Err")
            })
    }

    useEffect(() => {
        if (!checkAuth()) {
            navigate("/admin-login")
        }

        getAllOrders()





    }, [])

    const checkAuth = () => {
        return localStorage.getItem("userName") != null && localStorage.getItem("userRole") == "administrator";
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
                        <Route path='/' element={<AdminHomeContent setAllIncome={total} totalNoOfOrders={orders.length} commis={commis} />} />
                        <Route path='/check-orders' element={<CheckOrdersPage orders={orders} updateStatus={updateStatus} loading={loading} statusHandler={statusHandler} />} />
                        <Route path='/manage-delivery' element={<ManageDelivery />} />

                    </Routes>
                </div>
            </div>
        </>
    )
}

export default AdminHome