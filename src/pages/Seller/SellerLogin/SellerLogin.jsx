import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Nav from '../../../components/User/Nav/Nav';
import InputBox from '../../../components/InputBox/InputBox';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';

const SellerLogin = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(null)

    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem('userName') || ''
    )

    const userLogin = async (e) => {
        e.preventDefault()
        setErr(null)
        if (!userName || !password) {
            alert("Please fill all the required details")
            return;
        }

        await axios.post("http://localhost:4004/api/auth/login-seller", {
            username: userName, password
        })
            .then(res => {
                setCurrentUser(res.data.username)
                localStorage.setItem("userName", res.data.username)
                localStorage.setItem("userRole", res.data.role)
                localStorage.setItem("userId", res.data.userid)
                // window.location.href = "/"
                navigate("/seller")
            })

            .catch(err => {
                // alert("Err")
                setErr(err.response.data.message)
                // console.log(err.response.data.message)
            })
    }


    return (
        <>
            <Nav />
            <div className='container w-50' style={{ marginTop: '25px' }}>
                <h3>Seller Login</h3>
                <form onSubmit={userLogin}>

                    {
                        err != null ? <div class="alert alert-danger" role="alert">
                            {err}
                        </div> : null
                    }


                    <div className='mb-3'>
                        <InputBox lblName={"Username"} inputType={"text"} onInputChange={(e) => setUserName(e.target.value)} />
                    </div>

                    <div className='mb-3'>
                        <InputBox lblName={"Password"} inputType={"password"} onInputChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <SubmitButton text={"Login"} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default SellerLogin