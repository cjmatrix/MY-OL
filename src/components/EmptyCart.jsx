import React from 'react';
import { useNavigate } from 'react-router-dom';


const EmptyCartIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-16 w-16 text-gray-400" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
    />
  </svg>
);

const EmptyCart = () => {
  const navigate = useNavigate();

  return (

    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>
        <p className="text-gray-500 mt-1">
          0 items in your cart
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-12 
                      flex flex-col items-center justify-center text-center">
        
   
        <EmptyCartIcon />
        
      
        <h2 className="text-2xl font-bold text-gray-900 mt-6">
          Your cart is empty
        </h2>
        
    
        <p className="text-gray-500 mt-2">
          Add some products to get started
        </p>
        
    
        <button 
          onClick={() => navigate('/products')} // Navigates to products page
          className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg mt-6
                     hover:bg-orange-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          Browse Products
        </button>
        
      </div>
    </div>
  );
};

export default EmptyCart;