import { getProductImages } from "@/app/services/apiProductImages";
import { useQuery } from "@tanstack/react-query";

export function useProductImages(productId) {
  return useQuery({
    queryKey: ["product-images", productId],
    queryFn: () => getProductImages(productId),
    enabled: !!productId,
  });
}