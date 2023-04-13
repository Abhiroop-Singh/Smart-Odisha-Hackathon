const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
    ticketId:{
        type:Number,
    },
    issue:{
        type:String,
        required:true
    },
    industry_name:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true      
    },
    pincode:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    myFile:{
        type:String
    },
    pdfUpload:{
        type:String,
        default:""
    },
    SPCB:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("industrie",industrySchema);