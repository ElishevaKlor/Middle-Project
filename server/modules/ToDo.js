const mongoose=require('mongoose')
const ToDoSchema=new mongoose.Schema(
{
    title:String,
    tags:[String],
    completed:{
      type:Boolean,
      default:false
    }
}
,{timestamps:true}
)
module.exports= mongoose.model('ToDo',ToDoSchema)