import { getOrders } from "@/app/services/apiOrders";
import OrdersPage from "./OrderPage";


export default async function page() {
  const orders = await getOrders()

  return (
    <OrdersPage orders={orders}/>
       
  );
}