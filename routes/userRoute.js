const express=require('express')
const route=express()
const d=require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

route.get('/user',d.getpost)
route.post('/user',d.addPost)
route.put('/user/:id',authMiddleware,d.updatepost)
route.delete('/user/:id',authMiddleware,d.deletepost)
route.delete('/user',authMiddleware,d.deletepost)

module.exports=route;