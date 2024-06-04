import React, { useEffect, useState } from 'react'
import { MdOutlineDashboardCustomize } from "react-icons/md";

import { RiLogoutBoxRLine } from "react-icons/ri";
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
import './UserDashboard.css'
import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
    const [pageOpen, setPageOpen] = useState("dashpage1");
    const navigate = useNavigate();

    //View Product
    const [ productView, setProductView] = useState([]);

    const[selectedProduct, setSelectedProduct] = useState(null);

    function dashboard(pageid){
        setPageOpen(pageid);
        console.log(pageid);
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
        } catch(error){
            console.error('Error Fetching Products:', error);
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
                    <h2>User</h2>
                </div> 
                <h2>Hi!</h2>
            </div>
            <div className='sidebar'>
                <button className='sideh1' onClick={() => dashboard("dashpage1")}><MdOutlineDashboardCustomize className='sideicon' id='dashpage1' />Dashboard</button>
                
                <button className='sideh3' onClick={() => dashboard("dashpage6")}><MdOutlineViewHeadline className='sideicon' id='dashpage6'/>Product</button>

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

            {!selectedProduct && (
                    <div>
                        {pageOpen === 'dashpage6' && <div className='dashboard8'>
                    <div className="dashboard8cont">
                        <h1>Product</h1>
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

export default UserDashboard
