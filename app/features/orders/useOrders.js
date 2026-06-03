import { getOrders } from "@/app/services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export default function useOrders(){
    const{data:orders } = useQuery({
        queryKey:["orders"],
        queryFn:getOrders
    })

    return{orders}
}