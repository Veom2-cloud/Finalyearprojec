const express = require("express");
const router = express.Router();
const Item = require('../models/itemModel')

router.get("/getallitems", async(req, res) => {
  
    try {
        const items = await Item.find({})
        res.send(items)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/additem", async(req, res) => {

    const item = req.body.item

   try {
    const newitem = new Item({
        name : item.name,
        image : item.image,
        description : item.description,
        category : item.category,
        qty: item.qty,
        price : item.price
    })
    await newitem.save()
    res.send('New Item Added Successfully')
   } catch (error) {
       return res.status(400).json({ message: error });
   }
  
});

router.post("/getitembyid", async(req, res) => {

 const itemid = req.body.itemid

 try {
     const item = await Item.findOne({_id : itemid})
     res.send(item)
 } catch (error) {
     return res.status(400).json({ message: error });
 }
  
});

router.post("/edititem", async(req, res) => {

    const editeditem = req.body.editeditem

    try {
        const item = await Item.findOne({_id : editeditem._id})
        
        item.name= editeditem.name,
        item.description= editeditem.description,
        item.image= editeditem.image,
        item.category=editeditem.category,
        item.price = editeditem.price,
        item.qty = editeditem.qty

        await item.save()

        res.send('Item Details Edited successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deleteitem", async(req, res) => {

    const itemid = req.body.itemid

  try {
    await Item.findOneAndDelete({_id : itemid})
    res.send('Item Deleted successfully')
  } catch (error) {
      return res.status(400).json({ message: error });
  }
  
});




module.exports = router;
