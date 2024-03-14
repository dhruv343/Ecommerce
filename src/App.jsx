import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import Order from './pages/Order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/MyState';
import Login from './components/registration/Login';
import SIgnUp from './components/registration/SIgnUp';
import Productinfo from './pages/productinfo/Productinfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={
            <ProtectedRoutes><Order /></ProtectedRoutes>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
          <ProtectedRoutesforAdmin>
            <Dashboard />
          </ProtectedRoutesforAdmin>
          } />
          <Route path="/*" element={<NoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SIgnUp />} />
          <Route path="/productinfo/:id" element={<Productinfo />} />
          <Route path="/addproduct" element={
          <ProtectedRoutesforAdmin>
            <AddProduct />
          </ProtectedRoutesforAdmin>
          
          } />
          <Route path="/updateproduct" element={
          <ProtectedRoutesforAdmin>
           <UpdateProduct />
          </ProtectedRoutesforAdmin>
          
          } />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>

  )
}

export default App


export const ProtectedRoutes=({children})=>{

  if(localStorage.getItem("user")){
    return children
  }
  else{
   return <Navigate to={'/login'}/>
  }
   
}
export const ProtectedRoutesforAdmin=({children})=>{
const admin=JSON.parse(localStorage.getItem("user"))
if(admin.user.email==="dhruv4258@gmail.com"){
  return children
}
else{
  return <Navigate to={'/login'}/>
 }
}