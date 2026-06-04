"use client";

import OrdersPage from "./OrderPage";
import useOrders from "@/app/features/orders/useOrders";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const sortBy = searchParams.get("sortBy");
 const dateRange = searchParams.get("dateRange");
  const { orders = [] } = useOrders({ status, sortBy });

  return <OrdersPage orders={orders} status={status} sortBy={sortBy}dateRange={dateRange} />;
}