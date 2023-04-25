import React, { useState, useEffect } from 'react'
import Nav from '../../components/User/Nav/Nav'
import Header from '../../components/User/Header/Header'
import Product from '../../components/User/Product/Product'
import Footer from '../../components/User/Footer/Footer'
import axios from 'axios'

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts()
    }, [])


    const getProducts = async () => {
        setLoading(true);
        await axios.get("http://localhost:4001/api/get-products")
            .then(res => {
                setProducts(res.data.products)
                setLoading(false)
            })
            .catch(err => {
                alert("Err")
            })
    }


    return (
        <>
            <Nav />
            <Header />
            <section class="py-5">
                <div class="container px-4 px-lg-5 mt-5">
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {
                            loading ? 'Loading' : products.map((product, index) => {
                                return(<Product reviews={product.reviews} productName={product.name} price={product.price} image={product.image} id={product._id} />)
                            })
                        }

                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home