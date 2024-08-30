import Style from "./RecentProducts.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";

export default function RecentProducts() {
  // const [isLoading, setisLoading] = useState(false);
  // const [products, setProducts] = useState([]);

  // async function getProducts() {
  //   setisLoading(true);
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   console.log(data.data);

  //   setProducts(data.data);
  //   setisLoading(false);
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  //we will use usequery instead of the function and the useeffect
  // const {data:products, isLoading, isFetching, error, isError } =useQuery({
  //   //we create key unique to each query              query => order
  //   queryKey:['products'],  //we are creating unique key to products in case we moved from one page to another it will remain the same key with the same query
  //   //query function get arrow function it return promise
  //   queryFn:()=> axios.get('https://ecommerce.routemisr.com/api/v1/products'),
  //   select: (data)=> data.data.data,
  //   //we can add options to the query like retry, cacheTime, staleTime, keepPrevious
  //   staleTime: 20*1000,
  //   //to stop refetching
  //   // refetchOnMount: true,
  //   // refetchOnReconnect: false,
  //   // refetchOnWindowFocus:false
  // })

  //to use usequery u need 2 things :
  //1- query key
  //2- query function  >> it should return promise  you can use fetch or axios

  //instead of reusing the same query on many comps we can create custom hook and put inside it the query that we want and take the hook name and reuse it in another comp

  const {isLoading,error,data: products,isError,isFetching,} = useProducts();

  // console.log({ isLoading, isFetching });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3>{error}</h3>;
  }
  return (
    <div className="grid gap-4 mt-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
      {products.map((p) => (
        <ProductItem key={p._id} product={p} />
      ))}
    </div>
  );
}
