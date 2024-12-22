require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const connectToDB=require("./config/connectDB.JS")//check
const corsOptions=require('./config/corsOptions')
const UserRoute=require('./Routes/UserRoute')


const app=express()
const PORT=process.env.PORT||1000
app.use(cors(corsOptions))
app.use(express.json())
app.use('/users',require('./Routes/UserRoute'))
app.use('/posts',require('./Routes/PostRoute'))
app.use('/todoes',require('./Routes/ToDoRoute'))
connectToDB()
mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})
})
mongoose.connection.on('error',()=>{
    if (err) throw err
})



