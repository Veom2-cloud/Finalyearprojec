const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const { authSocket, socketServer } = require("./socketServer");
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const messages = require("./routes/messages");
const PostLike = require("./models/PostLike");
const Post = require("./models/Post");
var cors = require('cors')
const itemRoute = require('./routes/itemRoute')
const ordersRoute = require('./routes/ordersRoute')
const otpRoute = require('./routes/otprouter')
const Canteenorder = require("./routes/canteenorderroute")
var cors = require('cors')
const fileRoute = require('./routes/file');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const paymentroute = require("./routes/paymentroute")
var  fs = require("fs")
var rimraf = require("rimraf")
var uploaddir = __dirname + '/files'
const canteenroute = require("./routes/canteenitemroutes")

dotenv.config();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://post-it-heroku.herokuapp.com"],
  },
});

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB connected");
  }
);

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("Listening");
});

app.use(express.json());
app.use(cors());
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/messages", messages);
app.use('/api/items/', itemRoute)
app.use('/api/orders/' , ordersRoute)
app.use('/api/otp/' , otpRoute)
app.use("/api/", paymentroute)
app.use("/api/canteen/order/", Canteenorder)
app.use('/api/canteenitems/',canteenroute)
app.use(fileRoute);

fs.readdir(uploaddir , function(Err,files) {
  files.forEach(function(file,index){
fs.stat(path.join(uploaddir,file),function(err,stat){
  var endtime,now;
  if (err){
      return console.error(err)

  }
  now = new Date().getTime();
  endtime = new Date(stat.ctime).getTime() + 8.64e+7
  if(now>endtime){
      return rimraf(path.join(uploaddir,file),function(err){
          if(err){
              return console.error(err);
          }
          console.log("sunccessfully deleted")
      })
  }
})
  })
})



if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
