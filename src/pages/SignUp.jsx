import React from 'react';
import { useForm } from 'react-hook-form'; // Import useForm
import { signupUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function SignUp() {
    
    const { status, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        getValues 
    } = useForm();

    const onSubmit = async (data) => {
        try {
          
            await dispatch(signupUser({ email: data.email, password: data.password })).unwrap();
            navigate('/products');
        } catch (rejectedError) {
            console.error("Signup failed:", rejectedError);
           
        }
    };

    const FormError = ({ message }) => {
        if (!message) return null;
        return <span className="text-red-500 text-sm mt-1">{message}</span>;
    };

    return (
       
        <div className=" bg-gradient-to-br from-cyan-50 to-yellow-50 min-h-screen flex items-center justify-center mt-[-70px] fade-up">
            <div className="flex flex-col items-center">
                <div className=" p-3 rounded-full mb-4"> 
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className="w-8 h-8 text-cyan-700"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.64m-2.64 0l1.14-9.56a.75.75 0 00-.74-.83H15.82a.75.75 0 00-.74.83L13.5 21m4.5 0v-2.25a.75.75 0 00-.75-.75H13.5a.75.75 0 00-.75.75V21m-4.5 0v-9.75a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-7.5 0v-5.625a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m0 0h-3.75m0 0h3.75m0 0V3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m-3.75 0h3.75" 
                        />
                    </svg>
                </div>

                
                <h1 className="text-3xl font-bold text-gray-900">Welcome to MarketPlace</h1>
                <p className="text-gray-500 mt-1 mb-6">Your trusted online marketplace</p>

          
                <div className="bg-white p-8 rounded-lg shadow-md w-[480px]">
                    
             
                    <h2 className="text-2xl font-semibold text-gray-900">Get Started</h2>
                    <p className="text-sm text-gray-600 mt-1 mb-6">Login or create a new account</p>

                 
                    <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-md mb-6 ">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className={'text-gray-500 font-medium py-2 rounded-md hover:bg-gray-200'}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => { /* Already on register page */ }}
                            className={'bg-white text-gray-900 font-medium py-2 rounded-md shadow-sm'}
                        >
                            Register
                        </button>
                    </div>

                   
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                         <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input 
                                type="text" 
                                id="username" 
                                placeholder="Username"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register("username", {
                                    required: "Username is required"
                                })}
                            />
                            <FormError message={errors.username?.message} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="you@example.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            <FormError message={errors.email?.message} />
                        </div>
                        
                
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="••••••"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                            <FormError message={errors.password?.message} />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                placeholder="••••••"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === getValues("password") || "Passwords do not match"
                                })}
                            />
                            <FormError message={errors.confirmPassword?.message} />
                        </div>

                        {status === 'failed' && <FormError message={error} />}
               
                        <div>
                            <button 
                                type="submit"
                                disabled={isSubmitting || status === 'loading'}
                                className="w-full bg-cyan-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors duration-200
                                           disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              
                              {isSubmitting || status === 'loading' ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default SignUp;