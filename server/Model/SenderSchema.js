const mongoose=require("mongoose");
const senderSchema= new mongoose.Schema({

   

   username:{ 
    type:String,
    required:true,
    
   },
   password:{
    type:String,
    required:true
   }
   
})


const sender=new mongoose.model("sender",senderSchema);
module.exports=sender;