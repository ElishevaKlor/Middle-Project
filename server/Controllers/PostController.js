const Post=require('../modules/Post')
const getAllPosts=async(req,res)=>{
const posts=await Post.find().lean()
if (!posts)
    res.status(400).send("No Posts")
res.json(posts)
}
const getPostById=async(req,res)=>{
    const {id}=req.params
    const post=await Post.findById(id).lean()
    if (!post)
        res.status(400).send("No Post")
    res.json(post)
    }
const createPost=async(req,res)=>{
    const {title,body}=req.body
    if(!title)
        res.status(400).send("title is required")
        const post=await Post.create({title,body})
        if (!post)
            res.status(400).send("Create Failed")
        res.json(post)
 }
 const updatePost=async(req,res)=>{
    const {id,title,body}=req.body
        if(!id||!title)
        res.status(400).send("id and title is required")
        const post=await Post.findById(id).exec()
        if (!post)
            res.status(400).send("No Post")
        post.body=body
        post.title=title
        const savedPost=await post.save()
        if (!savedPost)
            res.status(400).send("Update Failed")
        res.json(savedPost)
 }
 const deletePost=async(req,res)=>{
 const {id}=req.body
 if (!id)
    res.status(400).send("id is required")
 const post=await Post.findById(id).exec()
 if (!post)
     res.status(400).send("No Post")
const deletedPost=await post.deleteOne()

 if (!deletedPost)
     res.status(400).send("Delete Failed")
 else
     res.send("Deleted Complete")
 
 }
module.exports={getAllPosts,getPostById,createPost,updatePost,deletePost}