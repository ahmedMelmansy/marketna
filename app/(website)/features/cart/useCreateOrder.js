"use client"

import { useMutation } from "@tanstack/react-query"
import { createOrder } from "../../services/service"
import toast from "react-hot-toast"

export default function useCreateOrder() {
  const { mutateAsync:createNewOrder , isPending:isCreatingOrder} = useMutation({
    mutationFn:createOrder,
    mutationKey:["orders"],
    onSuccess:()=>{
        toast.success("order created successfully")
    },
onError: (err) => {
  console.log(err);
  toast.error(err.message);
}
  })
  return {createNewOrder , isCreatingOrder}
}
