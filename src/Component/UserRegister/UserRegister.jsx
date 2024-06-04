import React, { useState } from 'react'
// import regisimg from '../../Asset/regisimg.png'
import regimg from '../../Asset/regisimg.png';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


import './UserRegister.css'
const UserRegister = () => {
  const [formData, setFormData] = useState({
    name:'',
    phonenumber:'',
    email:'',
    password:''
  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/userData/adddata', formData);
      console.log(response.data);
      console.log("Registration Successful")
      alert("Regsistration Successful");
      navigate('/userlogin');
    } catch(error){
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <div className="mainuserregister">
        <div className="userregister">
            <div className="divimg">
                <img src={regimg} alt="Register" />
                
            </div>
            <form onSubmit={handleSubmit}>
            <div className="divname">
                <label htmlFor="">User Name</label>
                <input type="text" name='name' id='name'
                value={formData.name} onChange={handleChange} required/> 
            </div>
            <div className="divphno">
                <label htmlFor="">Phone Number</label>
                <input type="text" name='phonenumber' id='phonenumber' 
                value={formData.phonenumber} onChange={handleChange} required/> 
            </div>
            <div className="divemail">
                <label htmlFor="">User EmailID</label>
                <input type="text" name='email' id='email'
                value={formData.email} onChange={handleChange} required/> 
            </div>
            <div className="divpswrd">
                <label htmlFor="">Password</label>
                <input type="password" name='password'
                value={formData.password} onChange={handleChange} required/> 
            </div>
            <div className="divsub">
                <button type='submit'>Submit</button>
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default UserRegister
