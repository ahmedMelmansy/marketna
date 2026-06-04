"use client";

import { getOrderById } from "@/app/services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrderId(orderId) {
  const { data: order, isLoading, error } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });

  return { order, isLoading, error };
}