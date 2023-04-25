import React from 'react'
import { Link } from 'react-router-dom'
import Star from "../../../images/star.png"

const Product = ({ productName, price, reviews, image, id }) => {
    // alert(productName)

    const getRatingAvg = () => {
        var allCount = 0;

        if (reviews.length > 0) {
            reviews.map(review => {
                allCount += review.rating;
            })

            return Math.round(allCount / reviews.length)
        } else {
            return 0;
        }


    }

    return (
        <div className="col mb-5">
            <div className="card h-100">
                <img className="card-img-top" src={image} alt="..." />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{productName}</h5>
                        Rs. {price}.00

                    </div>

                    <div className='text-center mb-0'>
                        {
                            Array.from(Array(getRatingAvg()), () => {
                                return (
                                    <img src={Star} width={15} alt="" srcset="" />
                                )
                            })

                        } <span style={{ fontSize: '12px' }}> ({reviews.length == 0 ? 'Not rated yet' : reviews.length})</span>
                    </div>

                </div>


                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <Link to={`/product/${id}`}><div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">View</a></div></Link>
                </div>
            </div>
        </div>
    )
}

export default Product