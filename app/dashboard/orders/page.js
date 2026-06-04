"use client";

import OrdersPage from "./OrderPage";
import useOrders from "@/app/features/orders/useOrders";
import { useSearchParams } from "next/navigation";

export default function Page() {


  return <OrdersPage orders={orders} status={status} sortBy={sortBy}dateRange={dateRange} />;
}