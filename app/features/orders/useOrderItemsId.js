"use client"
import { getOrderItemId } from "@/app/services/apiOrderItems";
import { useQuery } from "@tanstack/react-query";

export default function useOrderItemsId(id) {
  const { data: orderItems} = useQuery({
    queryKey: ["order_items", id],
    queryFn: () => getOrderItemId(id),
    enabled: !!id,
  });

  return { orderItems };
}