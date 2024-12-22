const express=require('express')
const ToDoController=require('../Controllers/ToDoController')
const route=express.Router()
route.get("/",ToDoController.getAllToDoes)
route.get("/:id",ToDoController.getToDoById)
route.post("/",ToDoController.createToDo)
route.put("/",ToDoController.updateToDo)
route.delete("/",ToDoController.deleteToDo)
module.exports=route