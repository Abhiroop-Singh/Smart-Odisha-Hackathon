const mongoose = require('mongoose');

const industryLoginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("industryLogin",industryLoginSchema);