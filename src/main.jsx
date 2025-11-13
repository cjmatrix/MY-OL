import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Products from "./pages/Products.jsx";
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from "react-redux";

import { store } from "./app/store.js";
import CartPage from "./pages/cartPage.jsx";
import SellPage from "./pages/SellPage.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProtectedRoute from "./pages/ProtectedRoutes.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/products",
        element: <Products></Products>,
        
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        element:<ProtectedRoute></ProtectedRoute>,
        children:[
          {
            path: "/cart",
            element: <CartPage></CartPage>,
          },
          {
            path: "/sell",
            element: <SellPage></SellPage>,
          },
        ]
      },
      
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
