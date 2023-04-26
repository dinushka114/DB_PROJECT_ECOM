import React, { useState, useEffect } from 'react';
import axios from "axios";
import { format } from "date-fns";

const CheckOrdersPage = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('Pending')


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
        getAllOrders()
    }, [])

    return (
        <div className='m-2'>
            <h1>Orders</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Items</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Delivery Service</th>
                        <th>Payment Id</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? 'Loading..' : orders.map(order => {
                            return (
                                <tr>
                                    <td>    {order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>
                                        {
                                            order.cart.map(item => {
                                                return (
                                                    <>
                                                        <p>{item.name.substring(0, 7)}... - {item.price} x <span style={{ fontWeight: 'bolder' }}>{item.quantity}</span></p>
                                                        <img src={item.image} width={100} alt="" srcset="" />
                                                    </>
                                                )
                                            })
                                        }
                                    </td>
                                    <td>{order.name}</td>
                                    <td>{order.address}</td>
                                    <td>{order.delivery_service}</td>
                                    <td>{order.payment_id}</td>
                                    <td> {order.status}
                                        <select onChange={statusHandler} className='form-control'>
                                            <option >Select status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Verifed">Verify</option>
                                            <option value="Cancel">Cancel</option>
                                        </select>
                                    </td>
                                    <td> <button onClick={() => { updateStatus(order._id) }} className='btn btn-warning'>Update</button> </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>

        </div>
    )
}

export default CheckOrdersPage