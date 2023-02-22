const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51JXN8ASGX65UtClKPbtOS5wOvP7HKw9eLxeJjQlotGkat3vyjR8YeFiVfIVCWXSDdBLqU0kyXPL1S7iHaksNo0JF00pnx6HRq9"
);
const CanteenOrder = require("../models/Canteenordermodel");


function generateOTP() {
          
  // Declare a digits variable 
  // which stores all digits
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
//    Math.floor(Math.random() * 10000)
  return OTP;
}


router.post("/placecanteenorder", async (req, res) => {
  const { token, subtotal, currentUser, cartcanteenItems,date,time,updatedTime } = req.body;
 


  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newcanteenorder = new CanteenOrder({
        name: currentUser.username,
        email: currentUser.email,
        userid: currentUser._id,
        ordercanteenItems: cartcanteenItems,
        ordercanteenAmount: subtotal,
        isPaid: true,
        transactionId: payment.source.id,
        date: date,
        time: time,
        updatedTime: updatedTime,
        otp : generateOTP()
      
      });

      newcanteenorder.save();

      res.send("Canteen Order placed successfully");
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/getcanteenuserorders", async (req, res) => {
  const { username } = req.body;
  try {
    const orders = await CanteenOrder.find({ name: username }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallcanteenorders", async (req, res) => {
  try {
    const canteenorders = await CanteenOrder.find({});
    const sortedByCreationDates = canteenorders.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDates);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/delivercanteenorder", async (req, res) => {
  const canteenorderid = req.body.canteenorderid;
  try {
    const canteenorder = await CanteenOrder.findOne({ _id: canteenorderid });
    canteenorder.isDelivered = true;
    await canteenorder.save();
    res.send("Canteen Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deletecanteenorder", async (req, res) => {
  const canteenorderid = req.body.canteenorderid;

  try {
    await CanteenOrder.findOneAndDelete({ _id: canteenorderid });
    res.send("Canteen order Deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});



module.exports = router;
