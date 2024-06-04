import React, { useState } from 'react'
// import loginavatar from '../../Asset/loginavatar.webp'
import loginimg from '../../Asset/loginavatar.webp';

import './UserLogin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
    const navigate = useNavigate();
    const [message] = useState("");

    const handleRegister = () => {
        navigate('/userregister');
    }

    const [formData, setFormData] = useState({
      email: "",
      password:"",
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        console.log("Form Data:", formData);

        const response = await axios.post("http://localhost:3000/userData/userlogin", formData);
        console.log("Response Data:",response.data);  
        console.log("Login Successful");
        alert("Login Successful");
         
        navigate('/userdashboard');
      } catch(error){
        console.error(error);
      //   if(error.response){
      //     console.error("Response Data:", error.response.data);
      //     console.error("Response Status:", error.response.status);
      //     setMessage("Login Failed."+ error.response.data.message);
      //   }
      //   else if (error.request) {
      //     // The request was made but no response was received
      //     console.error("No Response Received:", error.request);
      //     setMessage("Login Failed: No Response Received");
      // } else {
      //     // Something happened in setting up the request that triggered an Error
      //     console.error("Request Setup Error:", error.message);
      //     setMessage("Login Failed: Request Setup Error");
      // }
        alert("Login Failed");
      }
    }
   
  return (
    <div>
      <div className="userloginmain">
        <div className="userlogin">
          <div className="loginimg">
            <img src={loginimg} alt="Login" />
          </div>
          <form onSubmit={handleSubmit}>
          {/* <form> */}
          <div className="usemail">
            <label className='labname' htmlFor="">Email Id</label>
            <input className='inpname1' type="text" name='email' id='email'
            value={formData.email} onChange={handleChange} required/>
          </div>
          <div className="usepswrd">
            <label className='labname' htmlFor="">Password</label>
            <input className='inpname2' type="password" name='password' id='password'
            value={formData.password} onChange={handleChange} required/>
          </div>
          <div className="usesub">
            <button>Login</button>
            <p onClick={handleRegister}>Register to login?</p>

          </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default UserLogin
















