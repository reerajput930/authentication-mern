const userModel = require("../model/user");
const jwt = require("jsonwebtoken")

const allUser = async (req, res) => {
  const allUsers = await userModel.find({});
  console.log(allUsers);
  res.status(200).json(allUsers);
}; 
const register = async (req, res) => {
  try { 
    const password = req.body.password;  
    const cpassword = req.body.confirmpassword;
  
    if (password === cpassword) {
      const user = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });     

      console.log(req.body);
      res.json({ status: "success" });
    } else {
      alert("failed");
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.log("failed");
    res.json({ status: "failed" });
  }
};
const login = async (req, res) => {
  const findUser = await userModel.findOne({
    email: req.body.email,
    password:req.body.password
  }); 
 
  if (findUser) {
    const token = jwt.sign({
           email:req.body.email,
    },'mynameisriyawhatisyour')
    console.log(findUser);
    return res.status(200).json({status:"ok",user:token,userdata:findUser});
  } else {
    return res.json({status:"error",user:false})
  }
}; 
const getQuote = async (req,res)=>{

  const token = req.headers['x-access-token']
  
  try{
    const decoded = jwt.verify(token,'mynameisriyawhatisyour')
    const email = decoded.email
    const user = await userModel.findOne(
      {email:email}
      
    )  
     return res.json({status:"success",userDetail:user})
  }catch(error){
    console.log(error)
    res.status(404).json({status:"failed",error:"invalid token"})
  }  
}
const postQuote = async (req,res)=>{

    const token = req.headers['x-access-token']
       
    try{
      const decoded = jwt.verify(token,'mynameisriyawhatisyour')
      const email = decoded.email
      const user = await userModel.updateOne(
        {email:email},
        {$set:{quote:req.body.quote}}
      )
       return res.json({status:"success"})
    }catch(error){
      console.log(error)
      res.status(404).json({status:"failed",error:"invalid token"})
    }

} 
           
module.exports = {
  allUser,
  register,
  login,
  getQuote,
  postQuote
};
