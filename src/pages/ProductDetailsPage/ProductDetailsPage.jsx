import React, { useState, useEffect } from 'react'
import Nav from '../../components/User/Nav/Nav'
import Footer from '../../components/User/Footer/Footer'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import StarRating from '../../components/StartRating/StartRating';
import TextAreaBox from '../../components/TextArea/TextAreaBox';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import Star from "../../images/star.png"

const ProductDetailsPage = () => {

    const { id } = useParams();

    let [cart, setCart] = useState([])
    const [qty, setQty] = useState(0)


    const [rating, setRating] = useState(0);


    const [product, setProduct] = useState({})
    const [userId, setUserId] = useState(null)
    const [bought, setBought] = useState(false)
    const [myOrders, setMyOrders] = useState([])

    const [review, setReview] = useState(null)

    const [productReviews, setProductReviews] = useState([]);

    const [loading, setLoading] = useState(false)

    const [canReview, setCanReview] = useState(true)

    const [productQty, setProductQty] = useState(0)

    const checkCanReview = async () => {
        await axios.post("http://localhost:4001/api/check-review/" + id, { username: localStorage.getItem("userName") })
            .then(res => {
                if (res.data.status === 0) {
                    setCanReview(false)
                } else {
                    setCanReview(true)
                }
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getRatingAvg = () => {
        var allCount = 0;

        if (productReviews.length > 0) {
            productReviews.map(review => {
                allCount += review.rating;
            })

            return Math.round(allCount / productReviews.length)
        } else {
            return 0;
        }


    }

    const addReview = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:4001/api/add-review/", {
            review,
            rating,
            product: id,
            userName: localStorage.getItem("userName")
        })
            .then(res => {
                getProduct()
                setRating(0)
                setReview(null)
            })

            .catch(err => {
                alert("Something went wrong")
            })

    }


    const getProduct = async () => {
        setLoading(true)
        await axios.get("http://localhost:4001/api/get-product/" + id)
            .then(res => {
                setProduct(res.data.product)
                setProductReviews(res.data.product.reviews)
                setLoading(false)
            })
            .catch(err => {
                alert("Err")
            })
    }

    const getUserId = () => {
        let userId = localStorage.getItem("userId");
        console.log(userId)
        setUserId(userId)
    }

    const getMyOrders = async () => {

        await axios.get(`http://localhost:4003/api/get-orders/${localStorage.getItem("userId")}`)
            .then(res => {
                res.data.myOrders.map(order => {
                    order.cart.map(item => {
                        if (item.id == id) {
                            setBought(true)
                        }


                    })

                })

            })
            .catch(err => {
                console.log(err)
            })


    }

    // console.log(id + " quantity")
    let tempCart = JSON.parse(localStorage.getItem("cart")) || []; // get cart of localstorage or []

    const addToCart = (image, name, price) => {

        if (qty === 0 || qty == "") {
            alert("Please add quantity")

            return
        }

        let item = {}

        item['id'] = id;
        item['quantity'] = qty;
        item['image'] = image;
        item['name'] = name;
        item['price'] = price;

        let isExisingItem = tempCart.find(cartItem => cartItem.id == id);

        if (isExisingItem) {
            // let tempQty = isExisingItem.quantity
            isExisingItem.quantity = item.quantity
            setCart(tempCart)
            localStorage.setItem("cart", JSON.stringify(tempCart))
        } else {
            if (localStorage.getItem("cart")) {
                tempCart.push(item)
                setCart(tempCart)
                localStorage.setItem("cart", JSON.stringify(tempCart))
            } else {
                tempCart.push(item)
                setCart(tempCart)
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }

        }


    }

    const increaseQty = () => {
        setQty(qty + 1)
    }

    const decreaseQty = () => {
        if (qty > 0) {
            setQty(qty - 1)
        }
    }

    useEffect(() => {
        getProduct()
        getUserId()
        getMyOrders()
        checkCanReview()
    }, [])

    return (
        <>
            <Nav items={cart.length} />
            {/* <ProductDetailsSection addToCart={addToCart} setQty={setQty} qty={qty} /> */}
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={product.image} alt="..." /></div>
                        <div className="col-md-6">
                            <div className="small mb-1">SKU: {product.sku} - by {product.seller}</div>
                            <h3 className="fw-bolder">{product.name}</h3>


                            {
                                Array.from(Array(getRatingAvg()), () => {
                                    return (
                                        <img src={Star} width={15} alt="" srcset="" />
                                    )
                                })

                            } <span style={{ fontSize: '12px' }}> ({productReviews.length == 0 ? 'Not rated yet' : productReviews.length + ' ratings'})</span>


                            <div className="fs-5 mb-3">
                                <span style={{ fontSize: '22px' }}>Rs. {product.price}.00</span>

                            </div>
                            <p className="lead"> {product.description} </p>
                            <div className="d-flex">
                                <button onClick={decreaseQty} className='btn btn-outline-success ms-2 me-2'>-</button>

                                <input min={0} className="form-control text-center me-0" value={qty} id="inputQuantity" type="num" defaultValue={0} style={{ maxWidth: '3rem' }} />

                                <button onClick={increaseQty} className='btn btn-outline-success ms-2 me-2'>+</button>

                                <button onClick={() => addToCart(product.image, product.name, product.price)} className="btn btn-outline-dark flex-shrink-0" type="button">
                                    <i className="bi-cart-fill me-1"></i>
                                    Add to cart
                                </button>


                            </div>

                            {
                                loading ? <p className='mt-4'>Loading reviews</p> : null
                            }

                            {
                                productReviews != null ? <p className='mt-4 mb-4' style={{ fontSize: '20px', fontWeight: 'bold' }}>Reviews</p> : null
                            }

                            {
                                productReviews != null && productReviews.map(review => {
                                    return (
                                        <div className='row'>
                                            <p className='col-sm-6'>{review.review} by  <span className='text-secondary'>{review.user}</span> </p>
                                            <p className='col-sm-6'>
                                                {
                                                    Array.from(Array(review.rating), () => {
                                                        return (
                                                            <img src={Star} width={15} alt="" srcset="" />
                                                        )
                                                    })
                                                }
                                            </p>
                                        </div>
                                    )
                                })
                            }

                            {
                                productReviews.length == 0 ? 'No any reviews' : null
                            }

                            <hr />


                            {
                                bought == true && canReview == true ?
                                    <div className='mt-4'>
                                        <h4>Write a review</h4>
                                        <div className='mt-4'>
                                            <StarRating rating={rating} setRating={setRating} />
                                        </div>
                                        <form onSubmit={addReview}>
                                            <TextAreaBox onInputChange={(e) => setReview(e.target.value)} />
                                            <div className='mt-2'>
                                                <SubmitButton text={"Add review"} />
                                            </div>
                                        </form>
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ProductDetailsPage