import { getCategories } from "@/app/services/apiCategories";
import { useQuery } from "@tanstack/react-query";


export function useCategories(initialCategories = []) {
  const {
    data: categories,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,

    // SSR / fallback data
    initialData: initialCategories,

    // cache settings
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes (cache in memory)

    // UX behavior
    refetchOnWindowFocus: false,
    retry: 1,

    // prevent unnecessary refetch if data exists
    refetchOnMount: false,
  });

  return {
    categories: categories ?? [],
    isLoading,
    isError,
    error,
    isFetching,
  };
}