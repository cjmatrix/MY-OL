import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../features/cartSlice';

const CartIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 mr-2" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
    />
  </svg>
);

const ProductCard = ({filteredProducts}) => {

    const dispatch=useDispatch();
    
//   const product = {
//     imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
//     title: "Premium Wireless...",
//     description: "High-quality wireless headphones with noise cancellation",
//     category: "Electronics",
//     price: "299.99",
//     isAvailable: true,
//   };


  
   
   return filteredProducts.map(product=>{
       return <div className={`bg-white ${product.sold?'opacity-60 line-through decoration-gray-500/80':''} rounded-lg shadow-md overflow-hidden w-[24rem] mb-8`}>
        
      
        <div className="relative">
          <div className=' overflow-hidden'>

        
            <img 
              className="w-full h-48 object-cover hover:scale-120 transition-all duration-500" 
              src={product.imageUrl} 
              alt="Product Image" 
            />
            </div>
        
            <span className="absolute top-2 right-2 bg-orange-400 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {!product.sold?'Available':'Unavailable'}
            </span>
        
        </div>
        
     
        <div className="p-4">
          
        
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {product.title}
            </h3>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {product.category}
            </span>
          </div>
          
       
          <p className="text-sm text-gray-600 mt-1">
            {product.description}
          </p>
          
          <p className="text-2xl font-bold text-teal-500 mt-2">
            ${product.price}
          </p>
          
       
          <button  onClick={()=>dispatch(addToCart(product))} disabled={product.sold} className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg mt-4
                             flex items-center justify-center 
                             hover:bg-orange-600 transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
            <CartIcon />
            <span>{!product.sold?'Add to Cart':'Out Of Stock'}</span>
          </button>
        </div>

      </div>

        

    })
     
      
};

export default ProductCard;