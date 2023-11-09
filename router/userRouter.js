const express = require('express')
const router=express.Router()

const userController= require('../controller/userController')

router.post('/home',userController.Home)


module.exports=router