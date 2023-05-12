const path = require("path");
const express = require("express");
const multer = require("multer");
const File = require("../models/file");
const Router = express.Router();


var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
today.setMinutes(today.getMinutes() + 10);
var updatedTime =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const otpGenerator = require("otp-generator");
const otp = otpGenerator.generate(6, {
  lowerCaseAlphabets: true,
  specialChars: false,
  upperCaseAlphabets: false,
});
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


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 10000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

Router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      // const { currentUser, pages, copies, instruction } = req.body;
      const { path, mimetype } = req.file;

      const file = new File({
        ...req.body,
        file_path: path,
        file_mimetype: mimetype,
        otp:generateOTP()
      });
      const savedFile = await file.save();
      res.json({ msg: "file uploaded successfully.", savedFile: savedFile });
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.post("/deliverfile", async (req, res) => {
  const fileid = req.body.fileid;

  try {
    const file = await File.findOne({ _id: fileid });
    file.isDelivered = true;
    await file.save();
    res.send("file Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

Router.post("/ispaid", async (req, res) => {
  const fileid = req.body.fileid;

  try {
    const file = await File.findOne({ _id: fileid });
    file.ispaid = true;
    await file.save();
    res.send("file paid Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

Router.get("/getAllFiles", async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
});

Router.post("/getuserfile", async (req, res) => {
  const { username } = req.body;
  try {
    const files = await File.find({ username: username })
    res.send(files);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

Router.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.sendFile(path.join(__dirname, "..", file.file_path));
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

Router.post("/deletefile", async (req, res) => {
  const fileid = req.body.fileid;

  try {
    await File.findOneAndDelete({ _id: fileid });
    res.send("file Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = Router;
