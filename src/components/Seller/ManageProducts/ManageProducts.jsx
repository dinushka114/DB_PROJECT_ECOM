import React, { useState, useEffect } from 'react'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import ProductForm from '../ProductForm/ProductForm'
import axios from "axios";
import { Link } from 'react-router-dom';

const ManageProducts = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        getProducts()
    }, [])

    const toggleForm = () => {
        setModal(!modal)
    }

    const getProducts = async () => {
        setLoading(true)
        await axios.get(`http://localhost:4001/api/get-products/${localStorage.getItem("userName")}`)
            .then(result => {
                setProducts(result.data.products)
                setLoading(false)
            })
            .catch(err => {
                // alert("Err")
                console.log(err)
            })
    }

    const deleteProduct = async (id) => {
        let confirm = window.confirm("Are you sure?");
        if(confirm){
            await axios.delete(`http://localhost:4001/api/delete-product/${id}`)
            .then(res=>{
                alert(res.data.message)
                getProducts()
            }).catch(err=>{
                alert("ERR")
            })
        }
    }

    return (
        <main>
            <div className="container-fluid p-2">
                <PrimaryButton btnClass={'btn btn-outline-success'} text={"Add new product"} clickEvent={toggleForm} />

                {
                    modal ? <ProductForm toggleForm={toggleForm} /> : null
                }

                <table class="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">SKU</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            {/* <th scope="col">Category</th> */}
                            <th scope="col">Quantity</th>
                            <th scope="col">Reorder level</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? "Loading" : products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product.sku}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.weight}</td>
                                        <td>{product.description}</td>
                                        <td><img src={product.image} width={140} alt="" srcset="" /></td>
                                        {/* <td>{product.category}</td> */}
                                        <td>{product.quantity}</td>
                                        <td>{product.reorder_level}</td>
                                        <td> <Link to={`/seller/update-product/${product._id}`}><button className='btn btn-warning'>Update</button></Link> </td>
                                        <td><button onClick={() => deleteProduct(product._id)} className='btn btn-danger'>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>

            </div>
        </main>
    )
}

export default ManageProducts