const express = require("express");
const path = require("path")
const bodyParser = require("body-parser");
var cors = require('cors')

const PORT = 4006;

var db_connection = require("./database/index");

db_connection()

const app = express();

app.use(cors()) // Use this after the variable declaration
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const sellerRoute = require("./routes/index");

app.use("/api" , sellerRoute);

app.listen(PORT , ()=>{
    console.log(`User service is running on PORT ${PORT}`);
})