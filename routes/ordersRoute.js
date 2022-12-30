const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51JXN8ASGX65UtClKPbtOS5wOvP7HKw9eLxeJjQlotGkat3vyjR8YeFiVfIVCWXSDdBLqU0kyXPL1S7iHaksNo0JF00pnx6HRq9"
);
const Order = require("../models/orderModel");


function generateOTP() {
          
  // Declare a digits variable 
  // which stores all digits
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}


router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems,date,time,updatedTime } = req.body;
 


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
      const neworder = new Order({
        name: currentUser.username,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        isPaid: true,
        transactionId: payment.source.id,
        date: date,
        time: time,
        updatedTime: updatedTime,
        otp : generateOTP()
      
      });

      neworder.save();

      res.send("Order placed successfully");
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    const sortedByCreationDates = orders.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDates);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.send("Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deleteorder", async (req, res) => {
  const orderid = req.body.orderid;

  try {
    await Order.findOneAndDelete({ _id: orderid });
    res.send("order Deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});



module.exports = router;
