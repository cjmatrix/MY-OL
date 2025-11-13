import { addProduct } from '../features/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React from 'react';

export default function SellPage() {
    const { status } = useSelector(state => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const FormError = ({ message }) => {
        if (!message) return null;
        return <span className=" fade-up text-red-500 text-sm mt-1">{message}</span>;
    };

    const onSubmit = (data) => {
        const newProduct = {
            title: data.title, 
            category: data.category,    
            price: data.price,
            description: data.description,
            sold: false
        };
        
        const imageFile = data.imageFile[0];

        dispatch(addProduct({ newProduct, imageFile }))
            .unwrap() 
            .then(() => {
                navigate('/products');
                reset();
            })
            .catch((error) => {
                console.error("Failed to add product:", error);
                alert("Failed to add product. Please try again.");
            });
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 fade-up">
            
            <div className='bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto'>
                
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                    List a New Product
                </h2>
                <p className="text-gray-600 mb-6">
                    Fill in the details to list your product for sale
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input 
                            type="text" 
                            id="title"
                            placeholder='e.g., Wireless Headphones' 
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' 
                            {...register("title", { 
                                required: "Product Name is required" 
                            })}
                        />
                        <FormError message={errors.title?.message} />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea 
                            id="description"
                            placeholder='Describe your product...' 
                            className='w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500' 
                            {...register("description", { 
                                required: "Description is required" 
                            })}
                        />
                        <FormError message={errors.description?.message} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Price ($)
                            </label>
                            <input 
                                type="number" 
                                id="price"
                                placeholder='99.99' 
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' 
                                step="0.01"
                                {...register("price", {
                                    required: "Price is required",
                                    valueAsNumber: true,
                                    min: { value: 0.01, message: "Price must be at least $0.01" }
                                })}
                            />
                            <FormError message={errors.price?.message} />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select 
                                id="category"
                                className='w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500' 
                                {...register("category", { 
                                    required: "Please select a category" 
                                })}
                            >
                                <option value="" >Select a category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Home">Home</option>
                                <option value="Grocery">Grocery</option>
                            </select>
                            <FormError message={errors.category?.message} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Image
                        </label>
                        <input 
                            type="file" 
                            id="imageFile"
                            className='w-full p-3 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-teal-50 file:text-teal-700
                                      hover:file:bg-teal-100'
                            {...register("imageFile", {
                                required: "An image is required",
                                validate: {
                                    acceptedFormats: (files) => 
                                        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(files[0]?.type) ||
                                        "Only JPG, PNG, GIF, or WEBP formats are accepted",
                                    lessThan5MB: (files) => files[0]?.size < 5000000 || "Max file size is 5MB"
                                }
                            })}
                        />
                        <FormError message={errors.imageFile?.message} />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting || status === 'loading'}
                        className='w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg
                                   hover:bg-orange-600 transition-colors duration-200
                                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
                                   disabled:bg-gray-400 disabled:cursor-not-allowed'
                    >
                        {isSubmitting || status === 'loading' ? 'Uploading...' : 'List Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}