// import React from 'react'
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import axios from 'axios'

import './ProductDashboard.css'

const ProductDashboard = () => {
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

export default ProductDashboard
