const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/taskNode').then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log("db error");
})

module.exports=mongoose;