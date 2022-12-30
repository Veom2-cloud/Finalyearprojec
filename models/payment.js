const mongoose = require("mongoose");

const paymentSchema= mongoose.Schema({
    name : {type: String , require},
    orderAmount : {type:Number , require},
    isPaid : {type:Boolean , require , default: false},
    transactionId : {type:String , require},
 
  
 
},{
    timestamps : true
})

module.exports = mongoose.model('payment' , paymentSchema)