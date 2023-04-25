import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";


const Nav = ({ items }) => {

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem('userName') || null
    )


    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    )


    const logOut = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        navigate("/user-login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">Shop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <Link style={{ textDecoration: 'none' }} to={"/my-account"}>
                            <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">{
                                currentUser ? 'Hello ' + currentUser : null
                            }</a></li>
                        </Link>
                        {/* <li className="nav-item"><a className="nav-link" href="#!">About</a></li> */}
                        <li className="nav-item dropdown">
                            {/* <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a> */}
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#!">All Products</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <Link to={'/user-register'}><button className='btn btn-outline-primary' style={{ marginRight: '5px' }}>Register</button></Link>
                        {
                            localStorage.getItem('userName') == null ? <Link to={'/user-login'}><button className='btn btn-primary' style={{ marginRight: '5px' }}>Login</button></Link> : <button onClick={() => logOut()} className='btn btn-danger' style={{ marginRight: '5px' }}>Logout</button>
                        }
                        <Link to={'/shopping-cart'}>
                            <button className="btn btn-outline-dark" type="submit">
                                <i className="bi-cart-fill me-1"></i>
                                Cart
                                <span className="badge bg-dark text-white ms-1 rounded-pill">{cart.length || items}</span>
                            </button>
                        </Link>

                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Nav