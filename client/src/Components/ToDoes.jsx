import axios from 'axios'
import { useEffect, useState } from "react"
import ToDo from './ToDo'
const ToDoes=()=>{
const [toDoList, settoDoList] = useState([])
const getAllToDoes=async()=>{
try{
    const res=await axios.get('http://localhost:6010/todoes')
    if(res.status===200)
        settoDoList(res.data)

}catch(err){
console.error(err)
}
}

useEffect(()=>{
    getAllToDoes()
},[])

const createToDo=async()=>{
    const newToDo={}
    try{
       const res=await axios.post('http://localhost:6010/todoes',newToDo)
       if(res.status===200)
        settoDoList(res.data)//error
    }catch(err){
console.error(err)
}
}

const updateToDo=async()=>{
    const upToDo={}
    try{
        const res=await axios.put('http://localhost:6010/todoes',upToDo)
        if(res.status===200)
            settoDoList(res.data)//error
    }catch(err){
        console.error(err)
        }
   
}
const updateToDoComplete=async()=>{
    const {Id,complete}=0
    try{
        const res=await axios.put('http://localhost:6010/todoes',{Id,complete})
        if(res.status===200)
            settoDoList(res.data)//error
    }catch(err){
        console.error(err)
        }
}
const deleteToDo=async()=>{
    const Id = "675727cec84cae9608d85008"
    try{
        const res=await axios.delete(`http://localhost:6010/todoes/ ${Id}`)
        if(res.status===200)
            settoDoList(res.data)//error
    }catch(err){
        console.error(err)
        }
    
}
return(
    <>
    {toDoList.map(toDo=><ToDo toDo={toDo} update={updateToDo} updateComplete={updateToDoComplete} delete={deleteToDo}/>)}
    </>
    
)
}
export default ToDoes