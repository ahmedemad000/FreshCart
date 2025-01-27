import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'


//its custome hooks if you need to use the hook in many components

export default function useProducts() {
    const response = useQuery({
        queryKey: ["products"], 
        queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"), 
        select: (data) => data.data.data,
      });
  return response
}
