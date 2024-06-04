import React, { useEffect, useState }  from 'react'
import logo from '../../Asset/logo.png'
import { FcAssistant, FcManager, FcAddressBook } from "react-icons/fc";
import './UserNavbar.css'
import { useNavigate } from 'react-router-dom';

import { IoClose } from "react-icons/io5";
import axios from 'axios'


const UserNavbar = () => {
    const navigate = useNavigate();

    const handleLogout =() =>{
        localStorage.removeItem('adminToken');
        navigate('/');
    }

    const [productView, setProductView] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/productData/viewproducts');
            setProductView(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error Fetching Products:', error);
            setError('Error Fetching Products');
            setLoading(false);
        }
    };

    const handleProductClick = (product) => {
        console.log('Product Clicked:', product);
        setSelectedProduct(product);
    }

    const handleCloseProduct = () => {
        setSelectedProduct(null)
    }
  return (
    <div>
        <div className="divmain">
        <div className="navbar">
            <div className="nav1">
                <img src={logo} alt="" />
            </div>
            <div className="nav2">
                <ul className='list'>
                    <li className='licont'>
                            <FcAssistant className='navicon'/>
                            <h6>Need a Help?</h6>
                            <h5>9817236271</h5>
                    </li>
                    <li className='licont'>
                            <FcAddressBook  className='navicon'/>
                            {/* <p>Mail Id</p> */}
                            <h5>ecomall@gmail.com</h5>
                    </li>
                    <li className='licont'>
                            <FcManager className='navicon' />
                            {/* <p>My Contact</p> */}
                            <h5 onClick={handleLogout}>Logout</h5>
                    </li>
                    <li></li>
                </ul>
            </div>
        </div>
        </div>

        {!selectedProduct && (
                <div>
                    <div className='dashboard8'>
                        <div className="dashboard8cont">
                            {loading && <p>Loading...</p>}
                            {error && <p>{error}</p>}
                            <div className="divproducts">
                                {productView.map(product => (
                                    <div key={product.id} className="divpro" onClick={() => handleProductClick(product)}>
                                        <img className='proimg' src={product.proimage} alt=""
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://wallpapercave.com/wp/wp3598832.jpg'
                                            }} />
                                        <h4 className='procat'>{product.procategory}</h4>
                                        <p className='proname'>{product.proname}</p>
                                        <h3 className='proprice'>{product.proprice}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {selectedProduct && (
                <div className="selectedProductDetails">
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
  )
}

export default UserNavbar
