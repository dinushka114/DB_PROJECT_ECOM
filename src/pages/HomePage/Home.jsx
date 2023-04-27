import React, { useState, useEffect } from 'react'
import Nav from '../../components/User/Nav/Nav'
import Header from '../../components/User/Header/Header'
import Product from '../../components/User/Product/Product'
import Footer from '../../components/User/Footer/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState(null);
    const [isSearch, setIsSearch] = useState(false)
    const [isProductsHave, setIsProductsHave] = useState(false)

    useEffect(() => {
        getProducts()
    }, [])

    const searchProducts = async (e) => {
        e.preventDefault()
        if (query == null) {
            alert("Enter search query")
            return
        }

        await axios.post("http://localhost:4003/api/search-product", { "query": query })
            .then(res => {
                // console.log(res)
                setProducts(res.data)
                setIsSearch(true)
                setIsProductsHave(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getProducts = async () => {
        setLoading(true);
        setIsSearch(false)
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
            <Nav setQuery={setQuery} searchProduct={searchProducts} />
            <Header />
            <section class="py-5">
                <div class="container px-4 px-lg-5 mt-5">
                    {
                        isSearch ? <h2 className='m-2'>Search results for "{query}"</h2> : null
                    }
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">


                        {
                            loading ? 'Loading' : products.map((product, index) => {
                                return (<Product reviews={product.reviews} productName={product.name} price={product.price} image={product.image} id={product._id} />)
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