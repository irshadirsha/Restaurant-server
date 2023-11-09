const express = require('express')
const router=express.Router()

const userController= require('../controller/userController')
router.get("/",(req,res)=>{
    console.log("working");
    res.send("Done:working")
})
router.get('/home',userController.Home)
router.post('/addData',userController.Adddata)
router.post('/updateData',userController.UpdateData)
router.delete('/deleteData/:id',userController.DeleteData)

module.exports=router