const express=require('express')
const authRoute=express()
const auth=require('../controllers/authController')

authRoute.post('/register',auth.register)
authRoute.post('/login',auth.login)

module.exports=authRoute;