const mongoose=require('mongoose')

//schema
const userSchema = new mongoose.Schema(
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
      password: {
        type: String,
        required: [true, "password is required"],
      },
      conf_password: {
        type: String,
      },
      status:{
        type:Boolean,
        default:false
      }
    },
    { timestamps: true }
  );
  
  //export
  module.exports = mongoose.model("userModel", userSchema);