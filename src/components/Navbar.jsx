import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { fetchCart } from "../features/cartSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";

const StorefrontIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-teal-500"
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

const ProductsIcon = () => (
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
      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
    />
  </svg>
);

const SellIcon = () => (
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
      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#364153"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

const UserIcon = () => (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const ThreeDotsIcon = () => (
  <svg
    className="stroke-gray-700 hover:stroke-teal-500 transition-colors duration-200"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Navbar = () => {
  const [active, setActive] = useState("products");
  let { cartItems, totalQuantity } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const container = useRef();
  const cartRef = useRef();
  const { user, status, error } = useSelector((state) => state.auth);
  const {status:addStatus}=useSelector(state=>state.carts)

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [status, dispatch, user]);

  console.log(window.location.path)

  useGSAP(
    () => {
      if (totalQuantity > 0) {
        const tl = gsap.timeline();
        
        tl.to(cartRef.current, { y: -10, duration: 0.1, repeat: 1, yoyo: true,scale:1.50 });
        tl.to(cartRef.current, { rotation: 15, duration: 0.1, repeat: 3, yoyo: true, });
      }
    },
    { dependencies: [totalQuantity], scope:container ,revertOnUpdate:true}
  );

  function getNavLinkClass({isActive}){

    return isActive? ' flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-200':"px-4 py-2 flex items-center hover:text-teal-600 transition-colors duration-200"

  }

  console.log(user);

  
  return (
    <>
      <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-5" ref={container}>
        <div className="flex justify-between items-center relative z-5 w-[75rem] m-auto">
          <div className="flex items-center">
            <StorefrontIcon />
            <span className="font-bold text-xl ml-2">
              <span className="text-teal-500">Market</span>
              <span className="text-orange-500">Place</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            {/* Products Button */}
            <NavLink
              to='/products'
              className={getNavLinkClass}
            >
              <ProductsIcon />
              <span>Products</span>
            </NavLink>

            {/* Other Nav Items */}
            <div className="flex items-center space-x-6 text-gray-700">
              {user && (
                <NavLink
                 to='/sell'
                 className={getNavLinkClass}
                >
                  <SellIcon />
                  <span>Sell</span>
                </NavLink>
              )}
              <NavLink
               to={'/cart'}
                className={getNavLinkClass}
                
              > 
              <span ref={cartRef}>
                   <CartIcon />
              </span>
               
                <span className=" relative"> 
                  Cart{" "}
                  {user && (
                    <div className=" inline-block bg-orange-500 text-white w-[1.2rem] h-[1.2rem] text-center rounded-[50%] text-[0.8rem] absolute left-[90%] bottom-[1rem]">
                      {totalQuantity}
                    </div>
                  )}
                </span>
              </NavLink>
              {user ? (
                <a
                  href="#"
                  className="flex items-center hover:text-teal-600 transition-colors duration-200"
                >
                  <UserIcon />
                  <span>{user?.email.split("@")[0]}</span>
                </a>
              ) : (
                <NavLink
                  to='/login'
                  className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
                >
                  <span>Login/Signup</span>
                </NavLink>
              )}
              {user && (
                <button
                  onClick={() => {
                    dispatch(logoutUser());
                    navigate("/login");
                  }}
                  className="hover:text-teal-600 transition-colors duration-200"
                >
                  <ThreeDotsIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom thin gray line (implied from image) */}
      <div className="bg-gray-200 h-[2px]"></div>

      
    </>
  );
};

export default Navbar;
