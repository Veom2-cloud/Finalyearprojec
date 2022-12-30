const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({

    name : {type: String , require},
    price : {type: String , require} ,
    qty: {type: String, require},
    category : {type: String , require},
    image : {type: String , require},
    description : {type: String , require}

} , {
    timestamps:true,
})

const itemModel = mongoose.model('item' , itemSchema)

module.exports = itemModel