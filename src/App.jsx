import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "../src/Components/Products/Products";
import Categories from "../src/Components/Categories/Categories";
import Brands from "../src/Components/Brands/Brands";
import Login from "../src/Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider, { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider, { CartContext } from "./Context/CartContext";
import toast, { Toaster } from 'react-hot-toast';
import CheckOut from "./Components/CheckOut/CheckOut";
import Allorders from "./Components/Allorders/Allorders";


const x = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> }, // (*) means if the url is wrong display this page (NotFound)
    ],
  },
]);

const myClient = new QueryClient({
  defaultOptions: {
    queries: {
      //we can make all oprions global
      staleTime: 20 * 1000,
      retry: 3,
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
      gcTime: 5000,
    },
  },
});
export default function App() {
  return (
    <QueryClientProvider client={myClient}>
      <UserContextProvider>
        <CartContextProvider>
          <CounterContextProvider>
            <RouterProvider router={x}></RouterProvider>
          </CounterContextProvider>
        </CartContextProvider>
      </UserContextProvider>
      {/* this is icon is query's console it will not be executed in production  */}
      <Toaster/>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
