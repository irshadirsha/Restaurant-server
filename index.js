const express =require('express')
const app=express()
const cors = require('cors')
const dotenv = require("dotenv")
dotenv.config();

const userRouter=require ('./router/userRouter')
app.use(express.json());
const PORT=process.env.PORT
console.log(process.env.BASEURL);
const frontendport=process.env.BASEURL
app.use(
    cors({
        origin: frontendport, // Replace with the correct origin
        methods: ['GET', 'POST'],
        credentials: true,
    })
  ); 
  
    app.use('/',userRouter)
  
app.listen(PORT,()=>{
    console.log('server started')
})

