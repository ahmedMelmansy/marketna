import { addProduct as addProductApi } from "@/app/services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddProduct(){
    const queryClient = useQueryClient()
    const { mutate:addProduct , isPending:isLoading } = useMutation({
        mutationFn:addProductApi,

        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["products"]})
            toast.success("product added successfully");
        },
        onError: (err) => {
        console.log(err);
        toast.error(err.message);
        },
    })
    return{addProduct,isLoading}

}