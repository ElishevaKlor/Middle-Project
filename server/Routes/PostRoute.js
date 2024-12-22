const express=require('express')
const PostController=require('../Controllers/PostController')
const route=express.Router()
route.get("/",PostController.getAllPosts)
route.get("/:id",PostController.getPostById)
route.post("/",PostController.createPost)
route.put("/",PostController.updatePost)
route.delete("/",PostController.deletePost)
module.exports=route