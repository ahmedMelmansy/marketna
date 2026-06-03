import { addProfile as addProfileApi } from "@/app/services/apiProfiles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useAddProfile(){
    const queryClient = useQueryClient()
    const router = useRouter();
    const{mutate:addProfile , isPending:isAdding} =useMutation({
        mutationKey:["profiles"],
        mutationFn:addProfileApi,
        onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["profiles"]})
        toast.success("Account added successfully");
         router.push("/"); 
        },
        onError: (err) => {
        console.log(err);
        toast.error(err.message);
        },
    })
    return{addProfile , isAdding}
}