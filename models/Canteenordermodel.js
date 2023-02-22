const mongoose = require("mongoose");

const canteenorderSchema= mongoose.Schema({
    name : {type: String , require},
    email: {type: String , require},
    userid : {type: String , require},
    ordercanteenItems : [],
    ordercanteenAmount : {type:Number , require},
    isDelivered : {type:Boolean , require , default: false},
    transactionId : {type:String , require},
    date: {type: String , require},
    time: {type:String , require},
    updatedTime : {type: String , require},
    isPaid: {type: Boolean,require , default: false},
    otp:{ type: String,required: true},
 
},{
    timestamps : true
})

module.exports = mongoose.model('canteenorders' , canteenorderSchema)