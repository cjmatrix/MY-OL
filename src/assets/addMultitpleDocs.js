import { db } from "../firebase/config";
import { getFirestore, writeBatch,collection, doc } from "firebase/firestore";

const dataArray=[
  {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    title: "Vintage Leather Watch",
    description: "Classic analog watch with a genuine leather strap.",
    category: "Accessories",
    price: "149.50",
   sold: false
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    title: "Red Running Shoes",
    description: "Lightweight and breathable sneakers for avid runners.",
    category: "Footwear",
    price: "89.99",
   sold: false
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=1000&auto=format&fit=crop",
    title: "Smart Coffee Maker",
    description: "Program your coffee from your phone. WiFi enabled.",
    category: "Home",
    price: "75.00",
   sold: false
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    title: "Modern Laptop",
    description: "Ultra-thin laptop with 16GB RAM and 1TB SSD.",
    category: "Electronics",
    price: "1299.99",
   sold: false
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1000&auto=format&fit=crop",
    title: "Organic Green Tea",
    description: "A soothing blend of 50 organic green tea bags.",
    category: "Grocery",
    price: "15.99",
   sold: false
  }
]
export default async function addMultipleDocs() {
 
  const batch = writeBatch(db);
  
  
  const collectionRef = collection(db, 'products');

  console.log(`Preparing batch to add ${dataArray.length} documents...`);

  dataArray.forEach((item) => {
    
    const docRef = doc(collectionRef);
  
    batch.set(docRef, item);
  });

  try {
 
    await batch.commit();
    console.log("Success! Batch of documents added to Firestore.");
  } catch (error) {
    console.log('hii')
    console.error("Error adding documents in batch: ", error);
  }
}