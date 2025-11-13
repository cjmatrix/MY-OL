import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markProductsAsSold } from '../features/checkoutSlice';
import { clearCart } from '../features/cartSlice';

const OrderSummaryCard = () => {

    const dispatch=useDispatch()
    const {cartItems,totalPrice}=useSelector(state=>state.carts)

    
  
  const summary = {
    subtotal: "48463.95",
    shipping: "Free",
    total: "48463.95",
  };

  return (

    <div className="w-[24rem]">

  
      <div className="bg-white rounded-lg shadow-md p-6">
        
      
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Order Summary
        </h2>
        
     
        <div className="space-y-2 mb-4">
          
       
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </div>
          
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{summary.shipping}</span>
          </div>

        </div>
        

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        
      
        <button onClick={()=>{window.confirm('Are you sure')&& dispatch(markProductsAsSold(cartItems)).then(()=>dispatch(clearCart())) }} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
          Proceed to Checkout
        </button>

      </div>
    </div>
  );
};

export default OrderSummaryCard;