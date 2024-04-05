const express=require('express')
const app=express()
const port=process.env.PORT || 4000
const body_parser=require('body-parser')
const authRoute = require('./routes/authRoute')
const db  = require('./db/dbConfig')
const route = require('./routes/userRoute')

app.use(body_parser.urlencoded({extended:false}))
app.use(express.json());

app.use('/api',authRoute)
app.use('/api',route)
db
app.listen(port,()=>{
    console.log(`server running on ${port}`);
})