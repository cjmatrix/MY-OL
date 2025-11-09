import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 
import { fetchProducts,addProduct } from '../features/productsSlice';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart,clearCart} from '../features/cartSlice';
import ProductCard from '../components/ProductCard';
import { db } from '../firebase/config';
import addMultipleDocs from '../assets/addMultitpleDocs';
import ProductSearchHeader from '../components/ProductSearchHeader';



function Products() {
   
    const{products,status,error}=useSelector(state=>state.products)
    const dispatch=useDispatch();

  
    const [search,setSearch]=useState('');
    const [category, setCategory] = useState('all');

    // useEffect(() => {
    //     const productsCollection = collection(db, "products");
    //     const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
    //         const newProductList = snapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data()
    //         }));
    //         setProductList(newProductList);
    //     });

    //     return () => unsubscribe();
    // }, []);

    useEffect(()=>{

        if(status==='idle'){

            dispatch(fetchProducts())
        }
    },[status,dispatch])



// useEffect(()=>{
//     console.log(';hii')
//     addMultipleDocs()  
// },[])

    if(status==='loading' || status==='idle'){
        return   <div className="spinner grid place-content-center h-screen">
                    <div className="h-16 w-16 border-4 border-teal-500  border-t-transparent rounded-full animate-spin">

                    </div>
        </div>
    }

    console.log(category)
  
         const filteredProducts=products.filter(product=>(product.title.toLowerCase().includes(search.toLowerCase())||product.description.toLowerCase().includes(search.toLowerCase()   ))&&(category==='all'?true:product.category===category));
    
    
   
   

    return (
     
        
        <div className='p-8 fade-up'>
            <ProductSearchHeader search={search} setSearch={setSearch} category={category} setCategory={setCategory} ></ProductSearchHeader>
           
           
      
            

          
            <div className='flex flex-wrap  w-[75rem] m-auto gap-[1.5rem] py-16 fade-up'>
                <ProductCard filteredProducts={filteredProducts} ></ProductCard>
            </div>
        </div>
    );
}

export default Products;



// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts,addProduct ,removeProduct} from '../features/productsReducer';

// function Products() {
//   const dispatch = useDispatch();
 
//   const { products, status, error } = useSelector((state) => state.products);


//   useEffect(() => {
    
//     if (status === 'idle') {
//       dispatch(fetchProducts());
//     }
//   }, [status, dispatch]);

//   const handleRemove = (id) => {
//     dispatch(removeProduct(id));
//   };


//   if (status === 'loading') {
//     return <div>Loading products...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>All Products</h2>
//       {products.map((product) => (
//         <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
//           <h4>{product.name}</h4>
//           <p>${product.price}</p>
//           <button onClick={() => handleRemove(product.id)}>
//             Remove
//           </button>
//           {/* Add-to-cart button would go here */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Products;