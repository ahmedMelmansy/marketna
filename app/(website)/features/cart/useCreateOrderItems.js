"use client"

import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createOrderItems } from "../../services/service"

export default function useCreateOrder() {
  const { mutate:createNewOrderItem , isPending:isCreatingOrder} = useMutation({
    mutationFn:createOrderItems,
    mutationKey:["order_items"],
    onSuccess:()=>{
        toast.success("orderItems created successfully")
    },
onError: (err) => {
  console.log(err);
  toast.error(err.message);
}
  })
  return {createNewOrderItem , isCreatingOrder}
}
