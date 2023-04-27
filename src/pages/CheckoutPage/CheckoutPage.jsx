import React, { useState } from 'react'
// import "./Checkout.css"
import Nav from '../../components/User/Nav/Nav'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Swal = require('sweetalert2')

const CheckoutPage = () => {

    const navigate = useNavigate()

    const [delivery, setDelivery] = useState('')
    const [nameOnCard, setNameOnCard] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')

    const [billingAddress, setBillingAddress] = useState('')
    const [billingName, setBillingName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')

    const validateCardNumber = number => {
        //Check if the number contains only numeric value  
        //and is of between 13 to 19 digits
        const regex = new RegExp("^[0-9]{13,19}$");
        if (!regex.test(number)) {
            return false;
        }

        return luhnCheck(number);
    }

    const luhnCheck = val => {
        let checksum = 0; // running checksum total
        let j = 1; // takes value of 1 or 2

        // Process each digit one by one starting from the last
        for (let i = val.length - 1; i >= 0; i--) {
            let calc = 0;
            // Extract the next digit and multiply by 1 or 2 on alternative digits.
            calc = Number(val.charAt(i)) * j;

            // If the result is in two digits add 1 to the checksum total
            if (calc > 9) {
                checksum = checksum + 1;
                calc = calc - 10;
            }

            // Add the units element to the checksum total
            checksum = checksum + calc;

            // Switch the value of j
            if (j == 1) {
                j = 2;
            } else {
                j = 1;
            }
        }

        //Check if it is divisible by 10 or not.
        return (checksum % 10) == 0;
    }

    const pay = async () => {
        if (!delivery) {
            alert("Please select delivery service")
            return;
        }


        if (!validateCardNumber(cardNumber)) {
            alert("Card no is not valid")
            return
        }


        let user = localStorage.getItem("userId");
        let cart = JSON.parse(localStorage.getItem("cart"))
        let address = billingAddress + " " + city + " " + state + " " + zip
        let price = localStorage.getItem("totalPrice")

        await axios.post("http://localhost:4003/api/place-order", {
            user,
            cart,
            address,
            name: billingName,
            delivery_service: delivery,
            price,
            commis: Number(price) * 0.1
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Order placed successfully',
                    showConfirmButton: false,
                    timer: 1500
                })

                setTimeout(() => {
                    localStorage.removeItem("cart")

                    navigate("/my-account")

                }, 1800)


            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div>
            <Nav />


            <div class="container mt-5 px-5">

                <div class="mb-4">

                    <h2>Confirm order and pay</h2>
                    <span>please make the payment, after that you can enjoy all the features and benefits.</span>

                </div>

                <div class="row">

                    <div class="col-md-8">


                        <div class="card p-3">

                            <h6 class="text-uppercase">Payment details</h6>
                            <div class="inputbox mt-3"> <input type="text" name="name" class="form-control" onChange={(e) => setNameOnCard(e.target.value)} required="required" /> <span>Name on card</span> </div>


                            <div class="row">

                                <div class="col-md-6">

                                    <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" onChange={(e) => setCardNumber(e.target.value)} required="required" /> <i class="fa fa-credit-card"></i> <span>Card Number</span>


                                    </div>


                                </div>

                                <div class="col-md-6">

                                    <div class="d-flex flex-row">


                                        <div class="inputbox mt-3 mr-2"> <input type="text" placeholder='MM/YYYY' name="name" class="form-control" onChange={(e) => setExpiry(e.target.value)} required="required" /> <span>Expiry</span> </div>

                                        <div class="inputbox mt-3 mr-2"> <input type="text" name="name" placeholder='XXX' class="form-control" onChange={(e) => setCvv(e.target.value)} required="required" /> <span>CVV</span> </div>


                                    </div>


                                </div>


                            </div>



                            <div class="mt-4 mb-4">

                                <h6 class="text-uppercase">Billing Details</h6>

                                <div class="col-md-6">

                                    <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" onChange={(e) => setBillingName(e.target.value)} required="required" /> <span>Name</span> </div>


                                </div>


                                <div class="row mt-3">

                                    <div class="col-md-6">

                                        <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" onChange={(e) => setBillingAddress(e.target.value)} required="required" /> <span>Street Address</span> </div>


                                    </div>


                                    <div class="col-md-6">

                                        <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" onChange={(e) => setCity(e.target.value)} required="required" /> <span>City</span> </div>


                                    </div>




                                </div>


                                <div class="row mt-2">

                                    <div class="col-md-6">

                                        <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" onChange={(e) => setState(e.target.value)} required="required" /> <span>State/Province</span> </div>


                                    </div>


                                    <div class="col-md-6">

                                        <div class="inputbox mt-3 mr-2"> <input type="text" name="name" class="form-control" onChange={(e) => setZip(e.target.value)} required="required" /> <span>Zip code</span> </div>


                                    </div>




                                </div>

                            </div>

                        </div>


                        <div class="mt-4 mb-4 d-flex justify-content-between">


                            {/* <span>Previous step</span> */}


                            <button class="btn btn-success px-3" onClick={() => pay()}>Pay Rs.{localStorage.getItem("totalPrice")}.00</button>




                        </div>

                    </div>

                    <div class="col-md-4">

                        <div class="card card-blue mb-3">

                            <div className='card-header'>
                                <h5>Select Delivery Service</h5>
                            </div>

                            <div className='card-body'>


                                <section class="btn-group">
                                    <input type="radio"
                                        onChange={(e) => setDelivery(e.target.value)}
                                        class="btn-check"
                                        value={"Pronto"}
                                        name="btnradio"
                                        id="gfg" />
                                    <label class="btn btn-outline-secondary"
                                        for="gfg">
                                        Pronto
                                    </label>

                                    <input type="radio"
                                        class="btn-check"
                                        name="btnradio"
                                        onChange={(e) => setDelivery(e.target.value)}
                                        value={"Certis"}
                                        id="gfg2" />
                                    <label class="btn btn-outline-secondary"
                                        for="gfg2">
                                        Certis
                                    </label>

                                    <input type="radio"
                                        class="btn-check"
                                        name="btnradio"
                                        value={"Domex"}
                                        onChange={(e) => setDelivery(e.target.value)}
                                        id="gfg3" />
                                    <label class="btn btn-outline-secondary"
                                        for="gfg3">
                                        Domex
                                    </label>
                                </section>

                            </div>

                        </div>

                    </div>

                </div>


            </div>



        </div>
    )
}

export default CheckoutPage