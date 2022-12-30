const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51JXN8ASGX65UtClKPbtOS5wOvP7HKw9eLxeJjQlotGkat3vyjR8YeFiVfIVCWXSDdBLqU0kyXPL1S7iHaksNo0JF00pnx6HRq9"
);
const Payment = require("../models/payment");
const File = require("../models/file")

router.post("/payment", async (req, res) => {
    const { token, subtotal , fileid, currentUser} = req.body;
   
  
  
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
        const newpayment = new Payment({
          name: currentUser.name,
          orderAmount: subtotal,
          isPaid : true,
          transactionId: payment.source.id,
        });
  
        newpayment.save();

        const file = await File.findOne({ _id: fileid });
        file.ispaid = true;
        await file.save();

  
        res.send("Payment done successfully");
      } else {
        res.send("Payment failed");
      }
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" + error });
    }
  });
  
  router.post("/getpaymentuser", async (req, res) => {
    const { name} = req.body;
    try {
      const payments = await Payment.find({ name: name })
      res.send(payments);
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
  
  router.get("/getallpayment", async (req, res) => {
    try {
      const payments = await Payment.find({});
      res.send(payments);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });

  module.exports = router;


