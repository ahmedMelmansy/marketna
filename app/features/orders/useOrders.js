import { getOrders } from "@/app/services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export default function useOrders({ status, sortBy } = {}) {
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ["orders", status, sortBy],
    queryFn: () => getOrders({ status, sortBy }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return { orders, isLoading, error };
}