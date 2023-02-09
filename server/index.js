const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const userData = require("./router/user");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

app.use("/api", userData);

// creating token like this
// when decoding the tkoen we will get three part
//(header, payload,verify signature)
// const createToken = async()=>{
//   const token = await jwt.sign({_id:"63da6c8b3e96a4872c9f6002"},"mynameisreeandiamasweetgirl",{
//     expiresIn:"2 seconds"
//   })
//   console.log(token)

//   const userver = await jwt.verify(token,"mynameisreeandiamasweetgirl");
//   console.log(userver)

// }
// createToken()

app.get("/", (req, res) => {
  res.send("home");
});

// app.listen(PORT, () => {
//   console.log(`server is running at port -- ${PORT}`);
// })
 
mongoose
  .connect( 
    "mongodb+srv://reerajput930:reerajput930@nodeexpress-project.i1wimde.mongodb.net/authentication?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port -- ${PORT}`);
    });
  })
  .catch(() => {
    console.log("failed to connect with the mongodb");
  });
