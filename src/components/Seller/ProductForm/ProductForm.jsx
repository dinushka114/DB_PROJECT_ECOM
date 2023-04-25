import React, { useState, useEffect } from 'react'
import InputBox from '../../InputBox/InputBox'
import SubmitButton from '../../SubmitButton/SubmitButton'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import TextAreaBox from '../../TextArea/TextAreaBox'
import axios from "axios";
import "./ProductForm.css"
const ProductForm = ({toggleForm}) => {
    
    const [categoris, setCategories] = useState([]);
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [qty, setQty] = useState('');
    const [reLevel, setReLevel] = useState('')


    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        // setLoading(true)
        await axios.get("http://localhost:4002/api/get-categories")
            .then(result => {
                setCategories(result.data.categories)
                // setLoading(false)
            })
            .catch(err => {
                alert("Err")
            })
    }


    const productFormSubmit = async(e) => {
        e.preventDefault();
        if (!sku || !name || !price || !weight || !description || !image || !category || !qty || !reLevel) {
            alert("Please provide all required details")
            return
        }

        const formData = new FormData();

        formData.append("sku" , sku);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("weight", weight);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("category", category);
        formData.append("quantity", qty);
        formData.append("reorder_level", reLevel);
        formData.append("seller", localStorage.getItem("userName"));

        await axios.post("http://localhost:4001/api/add-product", formData)
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
        <div className='form-modal overlay'>
            <form onSubmit={productFormSubmit} className='form-modal-content'>
                <PrimaryButton btnClass={'btn btn-danger float-end'} text={'X'} clickEvent={toggleForm} />
                <h2>Add Product</h2>

                <div className='mb-3'>
                    <InputBox  lblName={"Sku"} inputType={"text"}  onInputChange={(e) => setSku(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <InputBox lblName={"Name"} inputType={"text"} onInputChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <InputBox lblName={"Price"} inputType={"text"} onInputChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <InputBox lblName={"Weight"} inputType={"text"} onInputChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <TextAreaBox lbl={"Description"} onInputChange={(e) => setDescription(e.target.value)} />
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
                    <InputBox lblName={"Quantity"} inputType={"text"} onInputChange={(e) => setQty(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <InputBox lblName={"Reorder level"} inputType={"text"} onInputChange={(e) => setReLevel(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <SubmitButton text={"Add Product"} />
                </div>
            </form>
        </div>
    )
}

export default ProductForm