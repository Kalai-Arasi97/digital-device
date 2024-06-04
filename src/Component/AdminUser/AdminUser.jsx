import React from 'react'
import "./AdminUser.css"
// import adminimg1 from '../../Asset/adminimg1.png';
import adminimg from '../../Asset/adminimg1.png';

// import userimg from '../../Asset/userimg.jpg';
import userimage from '../../Asset/userimg.jpg';

import { useNavigate } from 'react-router-dom';
// import { u } from 'react-router-dom';


const AdminUser = () => {
    // const history = useHistory();

    // const handleAdmin = () => {
    //     history.push('/adminlogin');
    // }
    const navigate = useNavigate();

    const handleAdmin =() => {
        navigate('/adminlogin');
    }

    const handleUser = () => {
        navigate('/userlogin')
    }
  return (
    <div>
      <div className="maindiv">
        <div className="admindiv">
            <img className='admusimg' src={adminimg} alt="" />
            <button className='admuser' onClick={handleAdmin}>Admin</button>
        </div>
        <div className="userdiv">
            <img className='admusimg' src={userimage} alt="" />
            <button className='admuser' onClick={handleUser}>User</button>
        </div>
      </div>
    </div>
  )
}

export default AdminUser
