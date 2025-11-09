import React from 'react';

const SearchIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 text-gray-400" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 text-gray-500" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M19 9l-7 7-7-7" 
    />
  </svg>
);

const ProductSearchHeader = ({search,setSearch,category,setCategory}) => {
   
  return (
    
    <div className="w-[75rem] m-auto">
      
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Available Products
        </h1>
        <p className="text-lg text-gray-500 mt-1">
          Discover amazing products from our sellers
        </p>
      </div>

      
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        
     
        <div className="relative flex-grow">
        
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
       
          <input
          value={search}
            onChange={(e)=>setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full h-12 pl-12 pr-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        
       
        <div className="relative flex-shrink-0 w-full md:w-48">
          <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
            className="w-full h-12 px-4 py-2 pr-10 border border-gray-300 rounded-lg 
                       text-gray-700 bg-white 
                       appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Footwear">Footwear</option>
            <option value="Home">Home</option>
            <option value="Grocery">Grocery</option>
          </select>
         
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDownIcon />
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProductSearchHeader;