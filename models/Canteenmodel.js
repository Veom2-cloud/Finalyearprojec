const mongoose = require("mongoose");

const canteenitemSchema = mongoose.Schema({

    name : {type: String , require},
    price : {type: String , require} ,
    qty: {type: String, require},
    category : {type: String , require},
    image : {type: String , require},
    description : {type: String , require}

} , {
    timestamps:true,
})

const canteenitemModel = mongoose.model('canteenitem' , canteenitemSchema)

module.exports = canteenitemModel