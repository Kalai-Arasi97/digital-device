// import React, { useState } from 'react'
// import loginavatar from '../../Asset/loginavatar.webp'
import loginimg from '../../Asset/loginavatar.webp'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  // const navigate = useNavigate();

  // const handleRegister = () => {
  //   navigate('/adminregister');
  // }

  const navigate = useNavigate();
  var email = "admin";
  var password = "admin";
  // var email1 = "admin"
  // var password1 = "admin";
  var loginHandler = () => {
    var email_ = document.querySelector("#email").value;
    var password_ = document.querySelector("#password").value;
    // var email1_ = document.querySelector("#email").value;
    // var password1_ = document.querySelector("#password").value;
    
    if(email === email_ && password === password_){
      alert('Login Successful')
      navigate('/admindashboard')
    }
    else{
     
      alert('Login Failed');
    }
  }

  return (
    <div>
      <div className="adminloginmain">
        <div className="adminlogin">
          <div className="loginimg">
            <img src={loginimg} alt="Login" />
          </div>
          <div className="admail">
            <label className='labname' htmlFor="">Email Id</label>
            <input className='inpname1' type="text" name='email' id='email'/>
          </div>
          <div className="adpswrd">
            <label className='labname' htmlFor="">Password</label>
            <input className='inpname2' type="password" name='password' id='password'/>
          </div>
          <div className="adsub">
            <button onClick={loginHandler}>Login</button>
            {/* <p onClick={handleRegister}>Register to login?</p> */}

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin











