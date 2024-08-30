import Style from "./Products.module.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { CounterContext } from "../../Context/CounterContext";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductItem from "../ProductItem/ProductItem";
import { json } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";

export default function Products() {
  // const {
  //   data: products,
  //   isLoading,
  //   isFetching,
  //   error,
  //   isError,
  // } = useQuery({
  //   queryKey: ["products"], //we are creating unique key to products in case we moved from one page to another it will remain the same key with the same query
  //   //query function get arrow function it return promise
  //   queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"), //if you removed (s) from product and used retry
  //   select: (data) => data.data.data,
  //   //we can add options to the query like retry, cacheTime, staleTime, keepPrevious
  //   // staleTime: 20 * 1000,
  //   //if theres error you order to try 3 times to fix it
  //   // retry:0,
  //   //we can make if condition
  //   // retry: (counter, err) => {
  //   //   if (counter > 5) {
  //   //     return false;
  //   //   }
  //   //   return confirm('again ??????')
  //   // },
  //   //fetch each 1s   fetch interval doesnt work if you in another tap
  //   // refetchInterval:1000,
  //   //to fetch each 1s if you went to any tap
  //   // refetchIntervalInBackground:true,
  // });

  //to use usequery u need 2 things :
  //1- query key
  //2- query function  >> it should return promise  you can use fetch or axios

  const { isLoading, error, data: products, isError, isFetching } = useProducts();

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3>{JSON.stringify(error)}</h3>;
  }

  return (
    <div className="grid gap-4 mt-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
      {products.map((p) => (
        <ProductItem key={p._id} product={p} />
      ))}
    </div>
  );
}
