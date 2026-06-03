"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "@/app/services/apiProducts";
import toast from "react-hot-toast";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isLoading, variables } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: () => {
      toast.error("Couldn't delete this Product");
    },
  });

  return { deleteProduct, isLoading, deletingId: variables };
}