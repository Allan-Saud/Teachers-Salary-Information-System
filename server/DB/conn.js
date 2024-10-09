const mongoose=require ("mongoose");

const DB="mongodb://127.0.0.1:27017/Project_6"

mongoose.connect(DB,{
    useNewURLParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongoDB connected");
}).catch((error)=>{
    console.log(error.message);
})



// const DB="mongodb+srv://saudallan99:summerproject123@cluster0.zcrz5uw.mongodb.net/TeacherSalary"