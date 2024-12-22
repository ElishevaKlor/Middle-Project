const ToDo=require('../modules/ToDo')
const getAllToDoes=async(req,res)=>{
const todoes=await ToDo.find().lean()
if (!todoes)
    res.status(400).send("No Todoes")
res.json(todoes)
}
const getToDoById=async(req,res)=>{
    const {id}=req.params
    const todo=await ToDo.findById(id).lean()
    if (!todo)
        res.status(400).send("No Todo")
    res.json(todo)
    }
const createToDo=async(req,res)=>{
    const {title,tags,completed}=req.body
        const todo=await ToDo.create({title,tags,completed})
        if (!todo)
            res.status(400).send("Create Failed")
        res.json(todo)
 }
 const updateToDo=async(req,res)=>{
    const {id,title,tags,completed}=req.body
        if(!id)
        res.status(400).send("id is required")
        const todo=await ToDo.findById(id).exec()
        if (!todo)
            res.status(400).send("No Todo")
        todo.title=title
        todo.tags=tags
        todo.completed=completed
        const savedTodo=await todo.save()
        if (!savedTodo)
            res.status(400).send("Update Failed")
        res.json(savedTodo)
 }
 const deleteToDo=async(req,res)=>{
 const {id}=req.body
 if (!id)
    res.status(400).send("id is required")
 const todo=await ToDo.findById(id).exec()
 if (!todo)
     res.status(400).send("No Todo")
const deletedToDo=await ToDo.deleteOne()

 if (!deletedToDo)
     res.status(400).send("Delete Failed")
 else 
     res.send("Deleted Complete")
 
 }
module.exports={getAllToDoes,getToDoById,createToDo,updateToDo,deleteToDo}