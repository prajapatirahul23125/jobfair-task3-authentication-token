const mongoose=require('mongoose')

//schema
const postSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "user name is required"],
      },
      email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
      },
      salary: {
        type: String,
        required:true
      },
      designation: {
        type: String,
        required: true, 
      },
      status:{
        type:Boolean,
        default:false,
      }
    },
    { timestamps: true }
  );
  
  //export
  module.exports = mongoose.model("postModel", postSchema);