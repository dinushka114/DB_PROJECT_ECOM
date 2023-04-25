import React, { useState } from 'react'
import Nav from '../../components/User/Nav/Nav'
import InputBox from '../../components/InputBox/InputBox'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import axios from "axios";

const UserRegisterPage = () => {

    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(null)
    const [err, setErr] = useState(null)
    const [success, setSuccess] = useState(null)

    const selectRole = (e) => {
        let role = e.target.value;
        setRole(role)
    }

    const register = (e) => {
        e.preventDefault()
        if (role === "seller") {
            sellerRegister()
        } else if (role === "buyer") {
            userRegister()
        } else if (role === "admin") {
            adminRegister()
        } else {
            alert("Please fill your role")
        }
    }

    const adminRegister = async () => {
        setErr(null)
        setSuccess(null)
        if (!name || !userName || !email || !password) {
            alert("Filllllllllll")
        }

        await axios.post("http://localhost:4004/api/auth/signup-admin", {
            name: name,
            username: userName,
            email, password
        })
            .then(res => {
                // alert(res.data.message)
                setSuccess(res.data.message)
            })

            .catch(err => {
                setErr(err.response.data.message)
            })
    }


    const sellerRegister = async () => {
        setErr(null)
        setSuccess(null)
        if (!name || !userName || !email || !password) {
            alert("Filllllllllll")
        }

        await axios.post("http://localhost:4004/api/auth/signup-seller", {
            name: name,
            username: userName,
            email, password
        })
            .then(res => {
                // alert(res.data.message)
                setSuccess(res.data.message)
            })

            .catch(err => {
                setErr(err.response.data.message)
            })
    }


    const userRegister = async () => {
        setErr(null)
        setSuccess(null)
        if (!name || !userName || !email || !password) {
            alert("Filllllllllll")
        }

        await axios.post("http://localhost:4004/api/auth/signup", {
            name: name,
            username: userName,
            email, password
        })
            .then(res => {
                // alert(res.data.message)
                setSuccess(res.data.message)
            })

            .catch(err => {
                setErr(err.response.data.message)
            })
    }


    return (
        <>
            <Nav />
            <div className='container w-50' style={{ marginTop: '25px' }}>
                <h3>User Register</h3>
                <form onSubmit={register}>

                    {
                        err != null ? <div class="alert alert-danger" role="alert">
                            {err}
                        </div> : null
                    }

                    {
                        success != null ? <div class="alert alert-success" role="alert">
                            {success}
                        </div> : null
                    }

                    <div className='mb-3'>
                        <InputBox lblName={"Name"} inputType={"text"} onInputChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <InputBox lblName={"Username"} inputType={"text"} onInputChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <InputBox lblName={"Email"} inputType={"email"} onInputChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <InputBox lblName={"Password"} inputType={"password"} onInputChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className='mb-3'>
                        <select className='form-control' onChange={selectRole}>
                            <option >Select your role</option>
                            <option value={"seller"} >As a seller</option>
                            <option value={"buyer"}>As a buyer</option>
                            <option value={"admin"}>As a admin</option>
                        </select>
                    </div>

                    <div className='mb-3'>
                        <SubmitButton text={"Register"} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserRegisterPage