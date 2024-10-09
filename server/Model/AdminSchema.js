const mongoose= require("mongoose");
const adminSchema= new mongoose.Schema({
   username:{ 
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   name:{
      type:String,
      required:true
   }
})


const Admin=new mongoose.model("admin",adminSchema);
module.exports=Admin;