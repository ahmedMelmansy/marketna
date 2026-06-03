"use client";

// useDeleteCategory.js
// Same fix: removed router.refresh() — causes full-page flicker for no reason.
// invalidateQueries is enough.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "@/app/services/apiCategories";
import toast from "react-hot-toast";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending: isLoading, variables } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: () => {
      toast.error("Couldn't delete this category");
    },
  });

  return { deleteCategory, isLoading, deletingId: variables };
}