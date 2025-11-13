import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
} from "../features/cartSlice";
import OrderSummaryCard from "../components/OrderSummuryCard";
import React from "react";
import EmptyCart from "../components/EmptyCart";
import { clearCart } from "../features/cartSlice";
import ConfirmationModal from "../components/Confirm";


const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const CartPage = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.carts);
  const dispatch = useDispatch();



  const listingCart = cartItems.map((obj) => {
    return (
      <div className="bg-amber-100 rounded-lg shadow-md p-4 flex justify-between mb-4 ">
        <div className="flex space-x-4">
          <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={obj.product.imageUrl}
              className="h-[100%] w-[100%] rounded-lg object-cover"
              alt=""
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">{obj.product.name}</h3>
              <p className="text-sm text-gray-500">{obj.product.description}</p>
            </div>

            <div className="flex items-center mt-2">
              <button
                onClick={() => dispatch(removeFromCart(obj.product))}
                className="border rounded-l-lg px-3 py-1 text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none"
              >
                -
              </button>
              <input
                type="text"
                className="border-t border-b w-10 text-center py-1"
                value={obj.quantity}
                readOnly
              />
              <button
                onClick={() => dispatch(addToCart(obj.product))}
                className="border rounded-r-lg px-3 py-1 text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end">
          <button
            onClick={() => dispatch(deleteFromCart(obj.product))}
            className="text-gray-400 hover:text-red-500 focus:outline-none"
          >
            <TrashIcon />
          </button>

          <span className="text-xl font-bold text-blue-600">
            ${obj.totalPriceItem}
          </span>
        </div>
      </div>
    );
  });

  return cartItems.length !== 0 ? (
    <div className="w-[75rem] m-auto">
      <div>
        
      </div>

      <div className="py-16 fade-up">
        <div className="w-[42rem] ">{listingCart}</div>
        
      </div>
      <div className=" fixed top-[140px] left-[69rem]">
          <OrderSummaryCard></OrderSummaryCard>
          <button
          onClick={() => dispatch(clearCart())}
          className="text-sm font-medium text-white hover:bg-teal-600 transition-all bg-teal-500 px-4 py-2 rounded-lg mt-4 "
        >
          Clear All
        </button>
        </div>
        
    </div>

  ) : (
    <div className="fade-up">
        <EmptyCart></EmptyCart>
    </div>
    
  );
};

export default CartPage;
