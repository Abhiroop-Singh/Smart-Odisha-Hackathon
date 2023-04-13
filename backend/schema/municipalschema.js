const mongoose = require('mongoose');

const municipalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("municipal",municipalSchema);