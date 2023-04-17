const express = require("express");
const app = express();
const path = require("path")
const bodyParser = require("body-parser");
var cors = require('cors')

const PORT = 4001;

var db_connection = require("./database/index");

db_connection()


app.use(cors()) // Use this after the variable declaration
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const productRoute = require("./routes/index");

app.use("/api" , productRoute);



app.listen(PORT , ()=>{
    console.log(`Product service is running on PORT ${PORT}`);
})