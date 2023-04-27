import React, { useEffect, useState } from 'react'
import Nav from '../../components/User/Nav/Nav'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const MyAccountPage = () => {

    const navigate = useNavigate();

    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!checkAuth()) {
            navigate("/user-login")
        } else {
            getMyOrders()
        }

        console.log(checkAuth())


    }, [])

    const checkAuth = () => {
        return localStorage.getItem("userName") != null;
    }

    const getMyOrders = async () => {
        setLoading(true)
        await axios.get(`http://localhost:4003/api/get-orders/${localStorage.getItem("userId")}`)
            .then(res => {
                setMyOrders(res.data.myOrders)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <Nav  />
            <div className='container' style={{ marginTop: '20px' }}>
                <h1>My Orders</h1>

                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Items</th>
                            <th>Address</th>
                            <th>Delivery Service</th>
                            <th>Payment Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            loading ? 'Loading..' : myOrders.map(order => {
                                return (
                                    <tr className={order.status == "Confirmed" ? 'table-success' : null || order.status == "Cancel" ? 'table-danger' : null || order.status == "Pending" ? 'table-warning' : null || order.status == "Dispatched" ? 'table-info' : null || order.status == "Delivered" ? 'table-primary' : null}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>
                                            {
                                                order.cart.map(item => {
                                                    return (
                                                        <>
                                                            <p>{item.name.substring(0, 5)}.. - {item.price} X {item.quantity}</p>
                                                            <img src={item.image} width={100} alt="" srcset="" />
                                                        </>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>{order.address}</td>
                                        <td>{order.status == "Delivered" ? <Link>Rate {order.delivery_service}</Link> : order.delivery_service}</td>
                                        <td>{order.payment_id}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
        </>
    )
}

export default MyAccountPage