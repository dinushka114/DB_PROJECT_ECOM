const mongoose = require('mongoose');
const {DB_URL} = require("../db_config");


const db_connection = async () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connected!!")
        })
        .catch((err) => {
            console.log("Error: " +err)
        })
}


module.exports = db_connection;