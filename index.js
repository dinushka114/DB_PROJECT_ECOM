const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors")

const PORT = 5000;
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/events" , (req,res)=>{
    const event = req.body;

    axios.post("http://localhost:4001/api/events" , event);
    axios.post("http://localhost:4002/api/events" , event);
    axios.post("http://localhost:4003/api/events" , event);

    res.send({status:'OK'})

})

app.listen(PORT,()=>{
    console.log(`Event bus is running on PORT ${PORT}`)
})