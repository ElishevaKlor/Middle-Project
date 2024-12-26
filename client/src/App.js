import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayoutBasic from './Components/NavBar';
import HomePage from './Components/HomePage';

const Posts = React.lazy(() => import('./Components/Posts/Posts'));
const Users = React.lazy(() => import('./Components/Users/Users'));
const Todos = React.lazy(() => import('./Components/ToDoes/ToDoes'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<DashboardLayoutBasic />}>
            <Route index element={<HomePage />} />
            <Route path="users" element={<Users />} />
            <Route path="todoes" element={<Todos />} />
            <Route path="posts" element={<Posts />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
