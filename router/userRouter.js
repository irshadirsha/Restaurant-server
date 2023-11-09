const express = require('express')
const router=express.Router()

const userController= require('../controller/userController')
router.get("/",(req,res)=>{
    console.log("working");
    res.send("Done:working")
})
router.get('/home',userController.Home)
router.post('/addData',userController.Adddata)
router.put('/updateData',userController.UpdateData)
router.delete('/deleteData',userController.DeleteData)

module.exports=router