import { fetchProducts, addProduct } from '../features/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellPage() {

  
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const {status}=useSelector(state=>state.products)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    function handleSell(e) {
        e.preventDefault();

       
        const newProduct = {
            title: name, 
            category,
            price: parseFloat(price),
            description,
            sold: false
        };

        dispatch(addProduct({ newProduct, imageFile }))
            .unwrap() // Use .unwrap() to handle navigation after promise settles 
            .then(() => {
                navigate('/products');
            })
            .catch((error) => {
                console.error("Failed to add product:", error);
               
            });

            //  without .unwrap()
            // dispatch(addProduct({ newProduct, imageFile })) 
            // .then((action) => {
            //     // You have to check the action 'type' manually
            //     if (action.type.endsWith('/fulfilled')) {
            //     // The thunk succeeded!
            //     navigate('/products');
            //     } 
            //     else if (action.type.endsWith('/rejected')) {
            //     // The thunk failed!
            //     console.error("Failed to add product:", action.payload);
            //     }
            // });
    }

    // --- New Tailwind CSS Layout ---
    return (
        // Page container with a light gray background
        <div className="bg-gray-50 min-h-screen py-12 fade-up">
            
            {/* Main form card */}
            <div className='bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto'>
                
                {/* Header */}
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                    List a New Product
                </h2>
                <p className="text-gray-600 mb-6">
                    Fill in the details to list your product for sale
                </p>

                {/* Form */}
                <form onSubmit={handleSell} className='space-y-6'>
                    
                    {/* Product Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input 
                            type="text" 
                            id="name"
                            placeholder='e.g., Wireless Headphones' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' 
                            required 
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea 
                            id="description"
                            placeholder='Describe your product...' 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className='w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500' 
                            required 
                        />
                    </div>

                    {/* Grid for Price and Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Price ($)
                            </label>
                            <input 
                                type="number" 
                                id="price"
                                placeholder='99.99' 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' 
                                required 
                                step="0.01"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            {/* Using a select like in the image */}
                            <select 
                                id="category"
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)} 
                                className='w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500' 
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Home">Home</option>
                                <option value="Grocery">Grocery</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Image
                        </label>
                        <input 
                            type="file" 
                            id="imageFile"
                     
                            onChange={handleFileChange} 
                            className='w-full p-3 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-teal-50 file:text-teal-700
                                      hover:file:bg-teal-100'
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className='w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg
                                   hover:bg-orange-600 transition-colors duration-200
                                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50'
                    >
                        {status==='loading' ? 'Uploading...' : 'List Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}