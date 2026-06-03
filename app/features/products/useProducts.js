import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/services/apiProducts";

export function useProducts(initialProducts = []) {
  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,

    // SSR / initial data
    initialData: initialProducts,

    // caching
    staleTime: 60 * 1000, // 1 min
    gcTime: 5 * 60 * 1000, // 5 min

    // UX behavior
    refetchOnWindowFocus: false,
    retry: 1,
    refetchOnMount: false,
  });

  return {
    products: products ?? [],
    isLoading,
    isError,
    error,
    isFetching,
  };
}