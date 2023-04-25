import React, { useState, useEffect } from 'react'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import CategoryForm from '../CategoryForm/CategoryForm'
import axioos from "axios";

const SellerAddCategory = () => {

    const [modal, setModal] = useState(false)
    const [categoris, setCategories] = useState([]);
    const [loading , setLoading] = useState(false)

    const toggleModal = () => {
        setModal(!modal);
    }


    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        setLoading(true)
        await axioos.get("http://localhost:4002/api/get-categories")
            .then(result => {
                setCategories(result.data.categories)
                setLoading(false)
            })
            .catch(err => {
                alert("Err")
            })
    }

    return (
        <main>
            <div className="container-fluid p-2">
                <PrimaryButton btnClass={'btn btn-outline-success'} clickEvent={toggleModal} text={"Add new category"} />
                {
                    modal ? <CategoryForm getCategories={getCategories} modalClose={toggleModal} /> : null
                }

                <table class="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Thumbnail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading?'Loading': categoris.map((category, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td><img src={category.thumbnail} alt="" srcset="" width={180} /></td>
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

export default SellerAddCategory