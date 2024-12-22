import axios from 'axios'
import { useEffect, useState } from "react"
import Post from './Post'
const postes=()=>{
const [postList, setpostList] = useState([])
const getAllpostes=async()=>{
try{
    const res=await axios.get('http://localhost:6010/postes')
    if(res.status===200)
        setpostList(res.data)

}catch(err){
console.error(err)
}
}

useEffect(()=>{
    getAllpostes()
},[])

const createpost=async()=>{
    const newpost={}
    try{
       const res=await axios.post('http://localhost:6010/postes',newpost)
       if(res.status===200)
        setpostList(res.data)//error
    }catch(err){
console.error(err)
}
}

const updatepost=async()=>{
    const uppost={}
    try{
        const res=await axios.put('http://localhost:6010/postes',uppost)
        if(res.status===200)
            setpostList(res.data)//error
    }catch(err){
        console.error(err)
        }
   
}
const deletepost=async()=>{
    const Id = "675727cec84cae9608d85008"
    try{
        const res=await axios.delete(`http://localhost:6010/postes/ ${Id}`)
        if(res.status===200)
            setpostList(res.data)//error
    }catch(err){
        console.error(err)
        }
    
}
return(
     //.sort((p1,p2)=>p1._id-p2._id)
    <>
    {postList.map(post=><Post post={post} update={updatepost} delete={deletepost}/>)}
    </>
    
)
}
export default postes