const mongoose = require("mongoose");

const otpSchema= mongoose.Schema({
    name : {type: String , require},
   
    otp:{ type: String,
    required: true},
 
},{
    timestamps : true
})

module.exports = mongoose.model('otp' , otpSchema)