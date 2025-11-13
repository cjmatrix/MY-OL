import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { checkUserSession } from './features/authSlice'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ToastContainer } from 'react-toastify';

function App() {
      const layoutRef=useRef(null)
      const {user,status,error}=useSelector(state=>state.auth)
      const navigate =useNavigate();
      useEffect(()=>{
        navigate('/products')
      },[])

      const dispatch=useDispatch();
      console.log('im inside app.jsx')
      useEffect(() => { 
              dispatch(checkUserSession());
  
          }, [dispatch]);
  
        console.log(user)


        useGSAP(()=>{
           gsap.timeline().to(layoutRef.current,{
            width:0,
            ease:'none',
            duration:0.5,
            
           })
        },{dependencies:[],scope:layoutRef})

        
  return(

   <>
     <div className='relative'>
       <div ref={layoutRef}  className='min-h-screen w-full bg-teal-500 z-10 absolute top-0 left-0 layout'></div>
     
      <Navbar></Navbar>
      <Outlet>  </Outlet>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
   </>

  )
}

export default App
