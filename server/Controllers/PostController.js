const Post=require('../modules/Post')
const getAllPosts=async(req,res)=>{
const posts=await Post.find().lean()
if (!posts)
    return res.status(400).send("No Posts")
res.json(posts)
}
const getPostById=async(req,res)=>{
    const {id}=req.params
    const post=await Post.findById(id).lean()
    if (!post)
        return res.status(400).send("No Post")
    res.json(post)
    }
const createPost=async(req,res)=>{
    const {title,body}=req.body
    if(!title)
        return res.status(400).send("title is required")
        const post=await Post.create({title,body})
        if (!post)
            return res.status(400).send("Create Failed")
        const posts=await Post.find().lean()
        if (!posts)
            return res.status(400).send("No Posts")
        res.json(posts)
 }
 const updatePost=async(req,res)=>{
    const {id,title,body}=req.body
        if(!id||!title)
        return res.status(400).send("id and title is required")
        const post=await Post.findById(id).exec()
        if (!post)
            return res.status(400).send("No Post")
        post.body=body
        post.title=title
        const savedPost=await post.save()
        if (!savedPost)
            return res.status(400).send("Update Failed")
        const posts=await Post.find().lean()
        if (!posts)
            return res.status(400).send("No Posts")
        res.json(posts)
 }
 const deletePost=async(req,res)=>{
 const {id}=req.params
 if (!id)
    return res.status(400).send("id is required")
 const post=await Post.findById(id).exec()
 if (!post)
     return res.status(400).send("No Post")
const deletedPost=await post.deleteOne()

 if (!deletedPost)
     res.status(400).send("Delete Failed")
 else{
     const posts=await Post.find().lean()
     if (!posts)
       return res.status(400).send("No Posts")
     res.json(posts)}
 
 }
module.exports={getAllPosts,getPostById,createPost,updatePost,deletePost}