const User=require('../modules/User')
const getAllUsers=async(req,res)=>{
const users=await User.find().lean()
if (!users)
    res.status(400).send("No Users")
res.json(users)
}
const getUserById=async(req,res)=>{
    const {id}=req.params
    const user=await User.findById(id).lean()
    if (!user)
        res.status(400).send("No User")
    res.json(user)
    }
const createUser=async(req,res)=>{
    const {name,userName,email,address,phone}=req.body
        const user=await User.create({name,userName,email,address,phone})
        if (!user)
            res.status(400).send("Create Failed")
        res.json(user)
 }
 const updateUser=async(req,res)=>{
    const {id,name,userName,email,address,phone}=req.body
        if(!id)
        res.status(400).send("id is required")
        const user=await User.findById(id).exec()
        if (!user)
            res.status(400).send("No User")
        user.name=name
        user.userName=userName
        user.email=email
        user.address=address
        user.phone=phone
        const savedUser=await user.save()
        if (!savedUser)
            res.status(400).send("Update Failed")
        res.json(savedUser)
 }
 const deleteUser=async(req,res)=>{
 const {id}=req.body
 if (!id)
    res.status(400).send("id is required")
 const user=await User.findById(id).exec()
 if (!user)
     res.status(400).send("No User")
const deletedUser=await user.deleteOne()

 if (!deletedUser)
     res.status(400).send("Delete Failed")
 else
     res.send("Deleted Complete")
 
 }
module.exports={getAllUsers,getUserById,createUser,updateUser,deleteUser}