import React, { useState, useEffect } from 'react'
import axios from "axios";

const SellerTrackingProduct = () => {

    const [orders, setOrders] = useState([])
    const [orderStatus, setStatus] = useState(null);

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = async () => {
        await axios.post("http://localhost:4006/api/get-my-orders", { "seller": localStorage.getItem("userName") })
            .then(res => {
                setOrders(res.data)
            })

            .catch(err => {
                alert(err)
            })
    }

    const updateStatus = async (orderID) => {
        await axios.post("http://localhost:4006/api/update-order-status", { "order_id": orderID, "status": orderStatus })
            .then(res => {
                alert("wade hari")
            }).catch(err => {
                alert("Errr")
            })
    }

    const selectStatus = (e) => {
        const status = e.target.value;
        if (status != "Select status") {
            setStatus(status)
        }
    }

    return (
        <div className='m-2'>

            <h2>Products tracking</h2>

            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <td>Product ID</td>
                        <th>Delivery Service</th>
                        <th>Item</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map(order => {

                            return (
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{order.item.id}</td>
                                    <td>{order.delivery_service}</td>
                                    <td>
                                        {order.item.name} - {order.item.price} x {order.item.quantity}
                                        <img src={order.item.image} width={100} alt="" srcset="" />
                                    </td>
                                    <td>
                                        {order.admin_status}
                                        <select className='form-control' onChange={selectStatus}>
                                            <option>Select status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Dispatched">Dispatched</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td> <button onClick={() => { updateStatus(order.id) }} className='btn btn-warning'>Update</button> </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}

export default SellerTrackingProduct