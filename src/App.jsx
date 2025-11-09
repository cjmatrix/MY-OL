import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { checkUserSession } from './features/authSlice'

function App() {

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

        
  return(

   <>
    <div >
      <Navbar></Navbar>
      <Outlet>  </Outlet>
    </div>
   </>

  )
}

export default App
