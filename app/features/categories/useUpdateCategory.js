"use client";

// useUpdateCategory.js
// Was completely missing/broken in the original codebase.
// The updateCategory API function also needs to be fixed (see apiCategories note).

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory as updateCategoryApi } from "@/app/services/apiCategories";
import toast from "react-hot-toast";

export default function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isPending: isLoading } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: () => {
      toast.error("Couldn't update this category");
    },
  });

  return { updateCategory, isLoading };
}