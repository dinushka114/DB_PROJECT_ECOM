import React, { useEffect, useState } from 'react'
import Nav from '../../components/User/Nav/Nav'
import "./ShoppingCart.css"
import { Link } from 'react-router-dom'

const ShoppingCartPage = () => {

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    )

    const [user, setUser] = useState(
        localStorage.getItem("userName") || null)

    const [role, setRole] = useState(
        localStorage.getItem("userRole") || null)



    const [totalPrice, setTotalPrice] = useState(0)

    const calculateTotalPrice = () => {
        let total = 0;
        cart.map(item => {
            total += item.quantity * item.price

        })

        setTotalPrice(total)
    }

    const deleteFromCart = (id) => {
        let tempCart = cart.filter(item => item.id != id)
        setCart(tempCart)
        localStorage.setItem("cart", JSON.stringify(tempCart))
    }




    useEffect(() => {
        calculateTotalPrice()
    }, [])

    return (
        <div>
            <Nav />
            <div className="container px-3 my-5 learfix">

                {
                    cart.length == 0 ?
                        <div className='card'>
                            <div className="card-header">
                                <h2>Shopping Cart</h2>

                            </div>
                            <div className='card-body'>
                                <p>Shopping cart is empty</p>
                            </div>
                        </div>

                        : <div className="card">
                            <div className="card-header">
                                <h2>Shopping Cart</h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered m-0">
                                        <thead>
                                            <tr>
                                                <th className="text-center py-3 px-4" style={{ minWidth: '400px' }}>Product Name &amp; Details</th>
                                                <th className="text-right py-3 px-4" style={{ width: '100px' }}>Price</th>
                                                <th className="text-center py-3 px-4" style={{ width: '120px' }}>Quantity</th>
                                                <th className="text-right py-3 px-4" style={{ width: '100px' }}>Total</th>
                                                <th className="text-center align-middle py-3 px-0" style={{ width: '40px' }}><a href="#" className="shop-tooltip float-none text-light" title="" data-original-title="Clear cart"><i className="ino ion-md-trash"></i></a></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                cart.map(item => {
                                                    return (
                                                        <tr>
                                                            <td className="p-4">
                                                                <div className="media align-items-center">
                                                                    <img src={item.image} className="d-block ui-w-40 ui-bordered mr-4" alt="" />
                                                                    <div className="media-body">
                                                                        <Link to={`/product/${item.id}`}><a className="d-block text-dark">{item.name}</a></Link>
                                                                        {/* <small>
                                                                    <span className="text-muted">Color:</span>
                                                                    <span className="ui-product-color ui-product-color-sm align-text-bottom" style={{ background: '#e81e2c' }}></span> &nbsp;
                                                                    <span className="text-muted">Size: </span> EU 37 &nbsp;
                                                                    <span className="text-muted">Ships from: </span> China
                                                                </small> */}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-right font-weight-semibold align-middle p-4">{item.price}</td>
                                                            <td className="align-middle p-4">{item.quantity} </td>
                                                            <td className="text-right font-weight-semibold align-middle p-4">{item.price * item.quantity}</td>
                                                            <td className="text-center align-middle px-0"><a href="#" onClick={() => deleteFromCart(item.id)} className="shop-tooltip close float-none text-danger" title="" data-original-title="Remove">×</a></td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
                                    <div className="mt-4">
                                        {/* <label className="text-muted font-weight-normal">Promocode</label>
                                <input type="text" placeholder="ABC" className="form-control" /> */}
                                    </div>
                                    <div className="d-flex">
                                        <div className="text-right mt-4 mr-5">
                                            {/* <label className="text-muted font-weight-normal m-0">Discount</label>
                                    <div className="text-large"><strong>$20</strong></div> */}
                                        </div>
                                        <div className="text-right mt-4">
                                            <label className="text-muted font-weight-normal m-0">Total price</label>
                                            <div className="text-large"><strong>Rs. {totalPrice}</strong></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="float-right">
                                    <Link to="/"><button type="button" className="btn btn-lg btn-default md-btn-flat mt-2 mr-3">Back to shopping</button></Link>
                                    {
                                        user && role == "buyer" ? <Link to={"/checkout"}> <button type="button" className="btn btn-lg btn-primary mt-2 float-end">Checkout</button></Link> : <button type="button" disabled className="btn btn-lg btn-primary mt-2 float-end">Checkout</button>
                                    }
                                </div>

                            </div>
                        </div>
                }


            </div>


        </div>
    )
}

export default ShoppingCartPage