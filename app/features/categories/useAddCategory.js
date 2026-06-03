"use client";

// useAddCategory.js
// Removed router.refresh() — React Query's invalidateQueries handles UI updates.
// router.refresh() caused a full server round-trip on every add which made
// the whole page flicker unnecessarily.

import { addCategory as addCategoryApi } from "@/app/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddCategory() {
  const queryClient = useQueryClient();

  const { mutate: addCategory, isPending: isLoading } = useMutation({
    mutationFn: addCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category added successfully");
    },
    onError: () => {
      toast.error("Couldn't add this category");
    },
  });

  return { addCategory, isLoading };
}