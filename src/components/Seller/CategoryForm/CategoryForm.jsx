import React, { useState } from 'react'
import InputBox from '../../InputBox/InputBox'
import axios from 'axios';
import "./Form.css"
import SubmitButton from '../../SubmitButton/SubmitButton';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';

const CategoryForm = ({ modalClose, getCategories }) => {

    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState(null)


    const categoryChange = (e) => {
        setCategory(e.target.value)
    }

    const descriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const onFileChange = (e) => {
        setThumbnail(e.target.files[0])
    }

    const categoryFormSubmit = async (e) => {
        e.preventDefault()

        if (!category || !description || !thumbnail) {
            alert("Please provide details");
            return
        }

        const formData = new FormData();

        formData.append("name", category);
        formData.append("thumbnail", thumbnail);
        formData.append("description", description);

        await axios.post("http://localhost:4002/api/add-category", formData)
            .then(res => {
                alert(res.data.message)
                getCategories()
            })
            .catch(err => {
                console.log(err)
            })

    }



    return (
        <div className='form-modal overlay'>
            <form onSubmit={categoryFormSubmit} className='form-modal-content'>
                <h2>Add category</h2>
                <div className='mb-3'>
                    <InputBox lblName={"Category"} inputType={"text"} onInputChange={categoryChange} />
                </div>
                <div className='mb-3'>
                    <InputBox lblName={"Description"} inputType={"text"} onInputChange={descriptionChange} />
                </div>
                <div className='mb-3'>
                    <InputBox lblName={"Thumbnail"} inputType={"file"} onInputChange={onFileChange} />
                </div>

                <div className='mb-3'>
                    <SubmitButton text={"Add category"} />
                    <PrimaryButton btnClass={'btn btn-danger float-end'} text={'X'} clickEvent={modalClose} />
                </div>
            </form>
        </div>
    )
}

export default CategoryForm