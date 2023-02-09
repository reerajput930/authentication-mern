const mongoose = require("mongoose")

const structure = mongoose.Schema({

     name:{
        type:"string",
        required:true
     },
     email:{
        type: String,
        require:true,
        unique:true,
        lowercase: true      
        
     },
     password:{
        type:String,
        required:true
     },
     date:{
        type:Date,
        default:Date.now
     },
     quote:{
       type:String,
       default:"no-update till now!"
     }


})
const model = mongoose.model("User",structure)

module.exports =  model