// require mongoose 
const mongoose = require('mongoose');

// connect to MongoDB
const connect = async()=>{
    try {await mongoose.connect(process.env.DB_URI) 
        console.log('connect to Databse Successfuly')
        
    } catch (error) {console.log(error)}

}

// exporting the connect function
module.exports = connect;
