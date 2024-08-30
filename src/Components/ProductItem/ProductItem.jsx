import Style from "./ProductItem.module.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductItem({ product }) {

  const  {addItemToCart, setCartItems}=useContext(CartContext);
  async function addItem(id){
   const response = await addItemToCart(id);
   console.log(response);
   if(response.data.status == "success"){
    setCartItems(response.data.numOfCartItems)
    toast.success('Product Added',{
      icon: '👍',
      duration:5000,
      style: {backgroundColor: "green", color:"white"},
      position:"top-right"
    })
   }
  }
  return (
    // when we click on any product its id will be saved and displaied in product details comp
    <div>
      <Link to={`/productDetails/${product._id}`}>
        <div className="hover:shadow-lg hover:shadow-green-700 ">
          <img
            src={product.imageCover}
            className="w-full object-cover"
            alt=""
          />
          <p className="text-sm text-green-600 my-2">{product.category.name}</p>
          <h3 className="text-2xl font-bold truncate mb-2">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="flex justify-between">
            <p>{product.price} EGY</p>
            <p>
              {product.ratingsAverage}{" "}
              <FaStar className="text-yellow-400 inline-block" />
            </p>
          </div>
        </div>
      </Link>
      <button className="bg-green-500 w-full p-2 rounded text-white btn" onClick={() => addItem(product._id)}>Add To Cart</button>
    </div>
  );
}
