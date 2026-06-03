import { editProduct as editProductApi } from "@/app/services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditProduct() {
    const queryClient = useQueryClient()
    const { mutate:editProduct , isPending:isUpdating } = useMutation({
        mutationFn:editProductApi,

        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["products"]})
            toast.success("product updated successfully");
        },
        onError: (err) => {
        toast.error(err.message || "Couldn't update this product");
        },
    })
    return{editProduct,isUpdating}
}


