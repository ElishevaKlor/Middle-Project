import axios from 'axios'
import { useEffect, useState } from "react"
import User from './User'

const useres=()=>{
const [userList, setuserList] = useState([])
const getAlluseres=async()=>{
try{
    const res=await axios.get('http://localhost:6010/useres')
    if(res.status===200)
        setuserList(res.data)

}catch(err){
console.error(err)
}
}

useEffect(()=>{
    getAlluseres()
},[])

const createuser=async()=>{
    const newuser={}
    try{
       const res=await axios.user('http://localhost:6010/useres',newuser)
       if(res.status===200)
        setuserList(res.data)//error
    }catch(err){
console.error(err)
}
}

const updateuser=async()=>{
    const upuser={}
    try{
        const res=await axios.put('http://localhost:6010/useres',upuser)
        if(res.status===200)
            setuserList(res.data)//error
    }catch(err){
        console.error(err)
        }
   
}
const deleteuser=async()=>{
    const Id = "675727cec84cae9608d85008"
    try{
        const res=await axios.delete(`http://localhost:6010/useres/ ${Id}`)
        if(res.status===200)
            setuserList(res.data)//error
    }catch(err){
        console.error(err)
        }
    
}
return(
     //.sort((p1,p2)=>p1._id-p2._id)
    <>
    {userList.map(user=><User user={user} update={updateuser} delete={deleteuser}/>)}
    </>
    
)
}
export default useres