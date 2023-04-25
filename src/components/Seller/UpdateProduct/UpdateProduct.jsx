import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import InputBox from '../../InputBox/InputBox'
import SubmitButton from '../../SubmitButton/SubmitButton'
import axios from "axios";
import TextAreaBox from '../../TextArea/TextAreaBox';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const { id } = useParams()

    const [product, setProduct] = useState({})

    const [categoris, setCategories] = useState([]);
    const [sku, setSku] = useState(product.sku);
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [weight, setWeight] = useState(product.weight);
    const [description, setDescription] = useState(product.description);
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(product.category);
    const [qty, setQty] = useState(product.quantity);
    const [reLevel, setReLevel] = useState(product.reorder_level)

    const getCategories = async () => {

        await axios.get("http://localhost:4002/api/get-categories")
            .then(result => {
                setCategories(result.data.categories)

            })
            .catch(err => {
                alert("Err")
            })
    }



    const getProduct = async () => {
        await axios.get(`http://localhost:4001/api/get-product/${id}`)
            .then(res => {
                setProduct(res.data.product)
            })
            .catch(err => {
                alert("Err")
            })
    }

    useEffect(() => {
        getProduct();
        getCategories();
    }, [])

    const productFormSubmit = async (e) => {
        e.preventDefault();
        if (!sku || !name || !price || !weight || !description || !image || !category || !qty || !reLevel) {
            console.log(sku)
            alert("Please provide all required details")
            return
        }

        const formData = new FormData();

        formData.append("sku", sku);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("weight", weight);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("category", category);
        formData.append("quantity", qty);
        formData.append("reorder_level", reLevel);

        await axios.put(`http://localhost:4001/api/update-product/${id}`, formData)
            .then(res => {
                alert(res.data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onFileChange = (e) => {
        setImage(e.target.files[0])
    }

    return (
        <div className='m-2'>
            <div className=''>
                <form onSubmit={productFormSubmit} className=''>
                    {/* <PrimaryButton btnClass={'btn btn-danger float-end'} text={'X'} clickEvent={toggleForm} /> */}
                    <h2>Update Product</h2>

                    <div className='mb-3'>
                        <InputBox val={product.sku} lblName={"Sku"} inputType={"text"} onInputChange={(e) => setSku(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <InputBox val={product.name} lblName={"Name"} inputType={"text"} onInputChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <InputBox val={product.price} lblName={"Price"} inputType={"text"} onInputChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <InputBox val={product.weight} lblName={"Weight"} inputType={"text"} onInputChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <TextAreaBox val={product.description} lbl={"Description"} onInputChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <InputBox lblName={"Image"} inputType={"file"} onInputChange={onFileChange} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="">Category</label>
                        <select name="" className='form-control' id="" onChange={(e) => { setCategory(e.target.value) }}>
                            <option >Select category</option>
                            {
                                categoris.map(cat => {
                                    return (
                                        <option value={cat._id}>{cat.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className='mb-3'>
                        <InputBox val={product.quantity} lblName={"Quantity"} inputType={"text"} onInputChange={(e) => setQty(e.target.value)} />
                    </div>

                    <div className='mb-3'>
                        <InputBox val={product.reorder_level} lblName={"Reorder level"} inputType={"text"} onInputChange={(e) => setReLevel(e.target.value)} />
                    </div>

                    <div className='mb-3'>
                        <SubmitButton text={"Update Product"} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct