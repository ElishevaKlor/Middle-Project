const mongoose=require('mongoose')
const PostSchema=new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },
    body:String,
}
,{timestamps:true}
)
module.exports= mongoose.model('Post',PostSchema)