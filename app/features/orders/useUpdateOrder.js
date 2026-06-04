"use client";

import { updateOrder } from "@/app/services/apiOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useUpdateOrder() {
  const queryClient = useQueryClient();

  const { mutate: updateThisOrder, isPending: isLoading } = useMutation({
    mutationFn: ({ orderId, status }) => updateOrder(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order updated successfully");
    },
    onError: (err) => {
      console.error("Update Error:", err);
      toast.error("Couldn't update this order");
    },
  });

  return { updateThisOrder, isLoading };
}