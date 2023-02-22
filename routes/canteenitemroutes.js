const express = require("express");
const router = express.Router();
const Canteenitem = require('../models/Canteenmodel')

router.get("/getallcanteenitems", async(req, res) => {
  
    try {
        const canteenitems = await Canteenitem.find({})
        res.send(canteenitems)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/addcanteenitem", async(req, res) => {

    const canteenitem = req.body.canteenitem
    // const canteenitem = req.body

   try {
    const newcanteenitem = new Canteenitem({
        name : canteenitem.name,
        image : canteenitem.image,
        description : canteenitem.description,
        category : canteenitem.category,
        qty: canteenitem.qty,
        price : canteenitem.price
    })
    await newcanteenitem.save()
    res.send('New Canteen Item Added Successfully')
   } catch (error) {
       return res.status(400).json({ message: error });
   }
  
});

router.post("/getcanteenitembyid", async(req, res) => {

 const canteenitemid = req.body.canteenitemid

 try {
     const canteenitem = await Canteenitem.findOne({_id : canteenitemid})
     res.send(canteenitem)
 } catch (error) {
     return res.status(400).json({ message: error });
 }
  
});

router.post("/editcanteenitem", async(req, res) => {

    const editedcanteenitem = req.body.editedcanteenitem

    try {
        const canteenitem = await Canteenitem.findOne({_id : editedcanteenitem._id})
        
        canteenitem.name= editedcanteenitem.name,
        canteenitem.description= editedcanteenitem.description,
        canteenitem.image= editedcanteenitem.image,
        canteenitem.category=editedcanteenitem.category,
        canteenitem.price = editedcanteenitem.price,
        canteenitem.qty = editedcanteenitem.qty

        await canteenitem.save()

        res.send('Canteen Item Details Edited successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deletecanteenitem", async(req, res) => {

    const canteenitemid = req.body.canteenitemid

  try {
    await Canteenitem.findOneAndDelete({_id : canteenitemid})
    res.send('Canteen Item Deleted successfully')
  } catch (error) {
      return res.status(400).json({ message: error });
  }
  
});


module.exports = router;
