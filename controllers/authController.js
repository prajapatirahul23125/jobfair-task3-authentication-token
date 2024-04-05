const userModel=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const register=async(req,res)=>{
    try{
        const {name,email,password,conf_password,status}=req.body;
        //validation
        if(!name || !email || !password) {
            return res.status(500).send({
              success: false,
              message: "Please Provide All Fields",
            });
          }
          //check user
          const userexist=await userModel.findOne({email:email})
          if(userexist){
            return res.status(500).send({
                success: false,
                message: "Email Already Registerd please Login",
            });
          }
          //hashing password
          const saltRounds = 10;
          const enPass=await bcrypt.hash(password, saltRounds)
          //create new user
            const user =new userModel({
                name,
                email,
                password:enPass,
                status
            });
            if(password===conf_password){
              user.save();
              return res.status(201).send({
                success: true,
                message: "Successfully Registered",
                user,
              });
            }
            else{
              return res.status(500).send({
                success: false,
                message: "Password OR Conf_Password Error",
            });
            }
            
    }
    catch(error){
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Register API",
          error,
        });
    }
}

const login=async(req,res)=>{
    try{
        const { email, password } = req.body;
        //validfatuion
        if (!email || !password) {
          return res.status(500).send({
            success: false,
            message: "Please PRovide EMail OR Password",
          });
        }
         //check user
        const user = await userModel.findOne({ email:email });
        if (!user) {
        return res.status(404).send({
            success: false,
            message: "User Not Found",
        });
        }
        //compare password || check password
        const dPass=await bcrypt.compare(password,user.password)
        console.log("dPass",dPass);
        if (!dPass) {
          return res.status(500).send({
            success: false,
            message: "Invalid Passwors",
          });
          }
          //token
          const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:"2d",
          });
          user.password = undefined;
          res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
          });
    }
    catch(error){
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Login API",
        error,
      });
    }
}

module.exports={register,login}