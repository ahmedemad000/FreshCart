import axios from "axios";
import Style from "./ProductDetails.module.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
  const  {addItemToCart, setCartItems}=useContext(CartContext);
  async function addItem(id){
   const response = await addItemToCart(id);
   console.log(response);
   if(response.data.status == "success"){
    setCartItems(response.data.numOfCartItems);
    toast.success('Product Added',{
      icon: '👍',
      duration:5000,
      style: {backgroundColor: "green", color:"white"},
      position:"top-right"
    })
   }
  }
  // we need to useQuery to prevent loading when we re enter on the same product
  const { id } = useParams(); // it used to get all parameters located in the url
 const {isLoading,isError,error,data: productDetails}= useQuery({
    queryKey: ['productDetails', id] ,
    queryFn: async () => axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    ),
    select:(data) => data.data.data
  })


  // //to get id from url we use hook called useParams
  // const [productDetails, setProductDetails] = useState(null);
  // // console.log(x);

  // // function to get product details
  // async function getProductDetails(id) {
  //   // API call to get product details
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products/" + id
  //   );
  //   // console.log(data);
  //   setProductDetails(data.data);
  // }

  // const [counter, setCounter] = useState(0);
  // useEffect(() => {
  //   getProductDetails(id);
  //   console.log("Mounting ProductDetails");
  // }, []);
  return (
    <>
      {/* in case there is a heading so we will make if condition only on the part that we want to make it loading untill data comes */}
      {/* <h2>Product Detials</h2> */}
      {/* {productDetails == null ? ( */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid gap-4 sm:grid-cols-12">
          <div className="col-span-4 py-5 ">
            {/* ? means if this variable has data will execute it if not it will stop and execute nothing */}
            <img src={productDetails?.imageCover} className="w-full" alt="" />
          </div>
          <div className="col-span-8 self-center py-5 ">
            <h2 className="text-3xl font-bold">{productDetails.title}</h2>
            <p className="my-3 font-light ">{productDetails.description}</p>
            <h3 className=" font-bold mb-2 ">{productDetails.category.name}</h3>
            <div className="flex justify-between">
              <p className="mb-3">{productDetails.price} EGY</p>
              <p>
                {productDetails.ratingsAverage}{" "}
                <FaStar className="text-yellow-400 inline-block" />{" "}
              </p>
            </div>
            <button onClick={()=> addItem(productDetails.id)} className="w-full bg-green-600 py-1 rounded-lg text-white">
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
