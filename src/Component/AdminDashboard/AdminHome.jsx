import React, { useEffect, useState } from 'react'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { RiMenuAddFill } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";
import { MdOutlineViewHeadline } from "react-icons/md";

import mob from '../../Asset/icon-phone.png'
import tv from '../../Asset/icon-television.png'
import lap from '../../Asset/icon-laptops.png'
import speaker from '../../Asset/icon-speaker.png'

import tele from '../../Asset/tv.jpg'
import game from '../../Asset/game.jpg'
import phone from '../../Asset/phone.jpg'
import headphone from '../../Asset/headphone.jpg'

import { IoClose } from "react-icons/io5";
import axios from 'axios'
import './AdminHome.css'
import { useNavigate } from 'react-router-dom';


const AdminHome = () => {
    const [pageOpen, setPageOpen] = useState("dashpage1");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [setselectedUser] = useState(null);

    //update user
    const [userData, setUserData] = useState({
        id:'',
        name:'',
        phonenumber:'',
        email:'',
        password:''
    });

    //delete user
    const [deleteUserId, setDelteUserId] = useState('');

    //add product
    const [productData, setProductData] = useState({
        proimage: '',
        procategory:'',
        proname:'',
        proprice:'',
        prodescription:''
    })

    //View Product
    const [ productView, setProductView] = useState([]);

    const[selectedProduct, setSelectedProduct] = useState(null);

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    function dashboard(pageid){
        setPageOpen(pageid);
        console.log(pageid);
    }

    useEffect(() => {
        console.log('Component Rendered');       
        fetchUsers();
    }, []);

    const fetchUsers = async() =>  {
        try{
            const response = await axios.get('http://localhost:3000/userData/getallusers');
            console.log('Response:', response.data);
            setUsers(response.data);
        } catch(error){
            console.error('Error fetching users:', error);
        }
    }

    const handleUserClick =(user)=>{
        setselectedUser(user);
        setUserData({
            id: user.id,
            name: user.name,
            phonenumber: user.phonenumber,
            email: user.email,
            password: user.password 
        });
    }

    //update user data
    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    }

    //update user data
    const handleSubmit = async () => {
        try{
            const response = await axios.put(`http://localhost:3000/userData/updateuser/${userData.id}`, userData);
            console.log(response.data);
            alert('User details updated Successfully');
            
        } catch(error){
            console.error('Error updating user details:', error);
            alert('Failed to update user details');
        }


    }

    //Delete data
    const handleDelete = async () => {
        try{
            if (!deleteUserId) {
                console.error("NO user ID selected for deletion");
                return;
            }
            await axios.delete(`http://localhost:3000/userData/deleteuser/${deleteUserId}`);
            alert('User Deleted Successfully');
            setDelteUserId('');
        } catch(error){
            console.error('Error Deleting user:', error);
            alert('Error Deleting User')
        }
    }


    //add pro
    const handleInpChange = (e) => {
        const {name, value} = e.target;
        setProductData({...productData, [name]: value});
    }

    //add product
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try{
           const response = await axios.post('http://localhost:3000/productData/addproduct', productData);
           console.log(response.data); 
           alert('Product Added Successful');
        } catch(error){
            console.error('Error Adding Product:', error);
            alert('Error Adding Product');
        }
    }

    //View Product
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try{
            const response = await axios.get('http://localhost:3000/productData/viewproducts');
            setProductView(response.data);
            console.log(response.data);
            // setLoading(false);
        } catch(error){
            console.error('Error Fetching Products:', error);
            // setError('Error Fetching Products');
            // setLoading(false);
        }
    };

    const handleProductClick = (product) => {
        console.log('Product Clicked:', product);
        setSelectedProduct(product);
    }

    //Close
    const handleCloseProduct = () => {
        setSelectedProduct(null)
    }

    //Logout 
    const handleLogout =() =>{
        localStorage.removeItem('adminToken');
        navigate('/');

    }

  return (
    <div>
      <div className="dashboard">
        <div className="dashboard1">
        <div className='dashboard2'>
            <div className='userlogo'>
                <div className='userlogo1'>
                    <h2>Admin</h2>
                </div> 
                <h2>Hi!</h2>
            </div>
            <div className='sidebar'>
                <button className='sideh1' onClick={() => dashboard("dashpage1")}><MdOutlineDashboardCustomize className='sideicon' id='dashpage1' />Dashboard</button>
                <button className='sideh1' onClick={() => dashboard("dashpage2")}><FaRegUser className='sideicon' id='dashpage2'/>User Details</button>
                <button className='sideh1' onClick={() => dashboard("dashpage3")}><FaUserPen className='sideicon' id='dashpage3' />User Update</button>
                <button className='sideh1' onClick={() => dashboard("dashpage4")}><TiUserDelete className='sideicon' id='dashpage4'/>Delete User</button>
                <button className='sideh1' onClick={() => dashboard("dashpage5")}><RiMenuAddFill  className='sideicon' id='dashpage5'/>Add Product</button>
                <button className='sideh1' onClick={() => dashboard("dashpage6")}><MdOutlineViewHeadline className='sideicon' id='dashpage6'/>View Product</button>

                <button className='sideh2' onClick={handleLogout}><RiLogoutBoxRLine className='sideicon1'/>Logout</button>
            </div>
            <div className='logout'>
            </div>
        </div>
        <div className="dashboard3">
            {pageOpen === "dashpage1" && <div className='dashboard3'>
                <div className="userdetails">
                    <h1>Dashboard</h1>
                    <div className="usercont">
                        <div className="divelectronic">
                            <img src={mob} alt="" />
                            <p>Smart Phone</p>
                        </div>
                        <div className="divelectronic">
                            <img src={tv} alt="" />
                            <p>Television</p>
                        </div>
                        <div className="divelectronic">
                            <img src={lap} alt="" />
                            <p>Laptop</p>
                        </div>
                        <div className="divelectronic">
                            <img src={speaker} alt="error" />
                            <p>Speaker</p>
                        </div>
                    </div>

                    <div className="deviceimg">
                        <img src={tele} alt="" />
                        <img src={game} alt="" />
                        <img src={phone} alt="" />
                        <img src={headphone} alt="" />
                    </div>
                </div>
            </div>}
            {pageOpen === "dashpage2" && <div className='dashboard4'>
                <h1>User Details</h1>
                {console.log("Users:", users)}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} onClick={() => handleUserClick(user)}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.phonenumber}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            
            </div>}

            {pageOpen === "dashpage3" && <div className='dashboard5'>
                <div className="dashboard5cont">
                <h1>Update User Details</h1>
                <div className="userdetupdate">
                    <form onSubmit={handleSubmit}>
                    <div className="divupdet">
                        <label className='userdetlab' htmlFor="id">Id</label>
                        <input type="text" id='id'
                        value={userData.id}
                        onChange={handleInputChange}
                        name='id'/>
                    </div>
                    <div className="divupdet">
                        <label className='userdetlab' htmlFor="name">Name</label>
                        <input type="text" id='name'
                        value={userData.name}
                        onChange={handleInputChange}
                        name='name'/>
                    </div>
                    <div className="divupdet">
                        <label className='userdetlab' htmlFor="phonenumber">Phone Number</label>
                        <input type="text" id='phonenumber'
                        value={userData.phonenumber} 
                        onChange={handleInputChange}
                        name='phonenumber'/>
                    </div>
                    <div className="divupdet">
                        <label className='userdetlab' htmlFor="email">Email</label>
                        <input type="text" id='email'
                        name='email'
                        value={userData.email} 
                        onChange={handleInputChange}/>
                    </div>
                    <div className="divupdet">
                        <label className='userdetlab' htmlFor="password">Password</label>
                        <input type="text" id='password'
                        value={userData.password} name='password'
                        onChange={handleInputChange}/>
                    </div>
                    <button type='submit'>Update</button>
                    </form>
                </div>
                </div>
            </div>}

            {pageOpen === "dashpage4" && <div className='dashboard6'>
                <div className="dashboard6cont">
                    <h1>Delete User Details</h1>
                    <div className="dltuser">
                        <form onSubmit={handleDelete}>
                            <div className="divdlt">
                            <label htmlFor="userId">Id</label>
                            <input className='dltinp' type="text"
                            id='userId' value={deleteUserId}
                            onChange={(e) => setDelteUserId(e.target.value)} required />
                            </div>
                            <button className='dltbtn' type='submit'>Delete</button>
                        </form>
                    </div>
                </div>
                </div>}

                {pageOpen === "dashpage5" && <div className='dashboard7'>
                    <div className="dashboard7cont">
                    <h1>Add Product</h1>
                    <div className="proadd">
                        <form onSubmit={handleAddProduct}>
                            <div className="proadddet">
                                <label className='userdetlab' htmlFor="proimage">Product Image</label>
                                <input className='userdetinp' type="text" id='proimage' name='proimage'
                                value={productData.proimage} onChange={handleInpChange}
                                required/>
                            </div>
                            <div className="proadddet">
                                <label className='userdetlab' htmlFor="procategory">Product Category</label>
                                <input className='userdetinp' type="text" id='procategory' name='procategory'
                                value={productData.procategory} onChange={handleInpChange}
                                required/>
                            </div>
                            <div className="proadddet">
                                <label className='userdetlab' htmlFor="proname">Product Name</label>
                                <input  className='userdetinp' type="text" id='proname' name='proname'
                                value={productData.proname} onChange={handleInpChange}
                                required/>
                            </div>
                            <div className="proadddet">
                                <label className='userdetlab' htmlFor="proprice">Price</label>
                                <input className='userdetinp' type="text" id='proprice' name='proprice'
                                value={productData.proprice} onChange={handleInpChange}
                                required/>
                            </div>
                            
                            <div className="proadddet">
                                <label className='userdettxtarea' htmlFor="prodescription">Description</label>
                                <textarea name="prodescription" id="prodescription" rows="5" cols="40" type='text'
                                value={productData.prodescription} onChange={handleInpChange} ></textarea>
                            </div>
                            <div className="divbtn">
                                <button className='btn' type='submit'>Add</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>}


                {!selectedProduct && (
                    <div>
                        {pageOpen === 'dashpage6' && <div className='dashboard8'>
                    <div className="dashboard8cont">
                        <h1>View Product</h1>
                        {/* {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>} */}
                        <div className="divproducts">
                            {productView.map(product => (
                                <div key={product.id} className="divpro"
                                onClick={ () => handleProductClick(product)}>
                                    <img className='proimg' src={product.proimage}
                                    alt=""
                                    // onError={(e) => {
                                    //     e.target.onerror = null;
                                    //     e.target.src = 'https://wallpapercave.com/wp/wp3598832.jpg'
                                    // }}
                                    
                                    />
                                    <h4 className='procat'>{product.procategory}</h4>
                                    <p className='proname'>{product.proname}</p>
                                    <h3 className='proprice'>{product.proprice}</h3>
                                </div>
                            ))}
                        </div>
                       

                    </div>

                    </div>
                    }
                    </div>
                )}
                

                    {selectedProduct && (<div className = "selectedProductDetails">
                       <div>
                       
                            <h2 className='headviewpro'>{selectedProduct.proname} 
                            <IoClose className='closeicon' onClick={handleCloseProduct} />
                            </h2>


                        <div className="selectedProductCont">
                        <img className='proimg' src={selectedProduct.proimage} alt="" /> 
                        <h4 className='proselectcat'>{selectedProduct.procategory}</h4>
                        <p className='proselectname'>Model: {selectedProduct.proname}</p>
                        <h3 className='proselectprice'>Price: {selectedProduct.proprice}</h3>
                        <p className='proselectdescription'>{selectedProduct.prodescription}</p>
                        </div>
                       </div>
                    </div>
                )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
