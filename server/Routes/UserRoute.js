const express=require('express')
const UserController=require('../Controllers/UserController')
const route=express.Router()
route.get("/",UserController.getAllUsers)
route.get("/:id",UserController.getUserById)
route.post("/",UserController.createUser)
route.put("/",UserController.updateUser)
route.delete("/",UserController.deleteUser)
module.exports=route