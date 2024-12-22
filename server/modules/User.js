const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema(
{
    name:String,
    userName:{
        type:String,
        default:"Guess"
    },
    email:String,
    address:String,
    phone:{
        type:String,
        maxLength:10
    }


}
,{timestamps:true}
)
module.exports= mongoose.model('User',UserSchema)