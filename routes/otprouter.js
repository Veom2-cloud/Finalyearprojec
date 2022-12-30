const express = require("express");
const router = express.Router();
const Otp = require("../models/otp");

router.post("/addotp", async (req, res) => {
  const { currentUser, otp } = req.body;

  try {
    const newotp = new Otp({
    name: currentUser.name,
    otp: otp
    });

    newotp.save();

    res.send("otp successfully added");
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/getotp", async (req, res) => {
  const { userid } = req.body;
  try {
    const otps = await Otp.find({ userid: userid }).sort({ _id: -1 });
    res.send(otps);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallotp", async (req, res) => {
  try {
    const otps = await Otp.find({});
    res.send(otps);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
