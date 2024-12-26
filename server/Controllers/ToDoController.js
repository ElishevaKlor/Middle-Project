const ToDo=require('../modules/ToDo')
const getAllToDoes=async(req,res)=>{
const todoes=await ToDo.find().lean()
if (!todoes)
    return res.status(400).send("No Todoes")
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
            return res.status(400).send("Create Failed")
        const todoes=await ToDo.find().lean()
        if (!todoes)
           return res.status(400).send("No Todoes")
        res.json(todoes)
 }
 const updateToDo=async(req,res)=>{
    const {id,title,tags,completed}=req.body
        if(!id||!title)
        return res.status(400).send("id and title are required")
        const todo=await ToDo.findById(id).exec()
        if (!todo)
            return res.status(400).send("No Todo")
        todo.title=title
        todo.tags=tags
        todo.completed=completed
        const savedTodo=await todo.save()
        if (!savedTodo)
            return res.status(400).send("Update Failed")
        const todoes=await ToDo.find().lean()
        if (!todoes)
           return res.status(400).send("No Todoes")
        res.json(todoes)
 }
 const deleteToDo=async(req,res)=>{
    const {id}=req.params
 if (!id)
    return res.status(400).send("id is required")
 const todo=await ToDo.findById(id).exec()
 if (!todo)
     return res.status(400).send("No Todo")
const deletedToDo=await ToDo.deleteOne({ _id: id })

 if (!deletedToDo)
     res.status(400).send("Delete Failed")
 else {
     const todoes=await ToDo.find().lean()
     if (!todoes)
        return res.status(400).send("No Todoes")
     res.json(todoes)}
 }
module.exports={getAllToDoes,getToDoById,createToDo,updateToDo,deleteToDo}