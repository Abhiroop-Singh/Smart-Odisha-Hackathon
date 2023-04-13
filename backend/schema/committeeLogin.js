const mongoose = require('mongoose');

const committeeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("committee",committeeSchema); 