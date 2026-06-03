"use client"
import {  getProducts } from "@/app/services/apiProducts";
import { useQuery } from "@tanstack/react-query";
export default function useProducts() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { products };
}