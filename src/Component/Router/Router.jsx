import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminUser from '../AdminUser/AdminUser'
import AdminLogin from '../AdminLogin/AdminLogin'
import UserLogin from '../UserLogin/UserLogin'
import UserRegister from '../UserRegister/UserRegister'
// import UserHome from '../UserHome/UserHome'
import User from '../Pages/User'
// import Admin from '../Pages/Admin'
import AdminHome from '../AdminDashboard/AdminHome'
// import AdminRegister from '../AdminRegister/AdminRegister'

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<AdminUser/>} />
            <Route path='/adminlogin' element={<AdminLogin/>}/>
            <Route path='/userlogin' element={<UserLogin/>}/>
            <Route path='/userregister' element={<UserRegister/>}/>
            <Route path='/userdashboard' element={<User/>}/>

            {/* <Route path='/admin' element={<Admin/>}/> */}
            <Route path="/admindashboard" element={<AdminHome/>}/>
            {/* <Route path='/adminregister' element={<AdminRegister/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
