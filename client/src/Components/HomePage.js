import { Suspense } from "react"
import { Routes,Route } from "react-router-dom"
const Post=React.lazy(()=>import('./Post'))
const ToDo=React.lazy(()=>import('./ToDo'))
const User=React.lazy(()=>import('./User'))
const HomePage=()=>{

return(
    <>
    <Link to={'/post'}>Post</Link>
    <Link to={'/todo'}>Todo</Link>
    <Link to={'/user'}>User</Link>
<Routes>
    <Route path='/user' element={<Suspense fallback="loading..."><User></User></Suspense>}/>
    <Route path='/todo' element={<Suspense fallback="loading..."><ToDo></ToDo></Suspense>}/>
    <Route path='/post' element={<Suspense fallback="loading..."><Post></Post></Suspense>}/>
</Routes>
    </>
    
)
}
export default HomePage