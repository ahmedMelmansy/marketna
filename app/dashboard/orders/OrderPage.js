"use client";

import styled from "styled-components";
import EditModal from "@/app/features/orders/EditModal";
import ContainerOrderDetails from "@/app/features/orders/ContainerOrderDetails";
import { PAGE_SIZE, shipping, surcharges} from "@/app/utils/Constant";
import {  useSearchParams } from "next/navigation";
import StatsRow from "./StatsRow";
import ControlOrders from "./ControlOrders";
import Pagination from "@/app/ui/Pagination";
import getDateRange from "@/app/utils/getDataRange";
import useOrders from "@/app/features/orders/useOrders";


const Page = styled.div`
  padding: 3rem 3.5rem;
  background: var(--color-grey-50);
  margin-bottom: 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #64748b;
  line-height: 1.6;
`;






const TableWrap = styled.div`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1.5rem 1.8rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: #475569;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Td = styled.td`
  padding: 1.6rem 1.8rem;
  font-size: 1.35rem;
  color: #1e2937;
  border-top: 1px solid #f8fafc;
  transition: background 0.15s;

  &:first-child {
    font-weight: 600;
  }
`;

const Tr = styled.tr`
  &:hover td {
    background: #f8fafc;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.5rem 1.2rem;
  border-radius: 100px;
  font-size: 1.2rem;
  font-weight: 600;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  ${(p) => {
    switch (p.$status) {
      case "completed": return "background:#ede9fe;color:#4c1d95;";
      case "delivered":  return "background:#d1fae5;color:#065f46;";
      case "shipped":    return "background:#dbeafe;color:#1e40af;";
      case "pending":    return "background:#fef3c7;color:#92400e;";
      default:           return "background:#fee2e2;color:#991b1b;";
    }
  }}
`;

const MobileCard = styled.div`
  display: none;
  background: #ffffff;
  padding: 1.8rem;
  border-radius: 16px;
  margin-bottom: 1.2rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;

  &:last-child { margin-bottom: 0; }
`;

const MobileLabel = styled.span`
  color: #64748b;
  font-weight: 500;
`;

const ResultCount = styled.p`
  font-size: 1.3rem;
  color: #94a3b8;
  margin-bottom: 1.2rem;
`;

const Empty = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  font-size: 1.5rem;
  color: #94a3b8;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const sortBy = searchParams.get("sortBy");
  const dateRange = searchParams.get("dateRange") || "all";

  const currentPage = Number(searchParams.get("page")) || 1;

  const { orders = [] } = useOrders({ status, sortBy });


  const startDate = getDateRange(dateRange);
  const ordersAfterDate = startDate
    ? orders.filter((o) => new Date(o.created_at) >= startDate)
    : orders;

  const ordersFiltered = status
    ? ordersAfterDate.filter((o) => o.status === status)
    : ordersAfterDate;

  const ordersSorted = [...ordersFiltered].sort((a, b) => {
    if (sortBy === "total_amount-desc") return b.total_amount - a.total_amount;
    if (sortBy === "total_amount-asc")  return a.total_amount - b.total_amount;
    return 0;
  });


  const totalCount  = ordersSorted.length;
  const paginated   = ordersSorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
 




  return (
    <Page>
      <PageHeader>
        <Title>Order management</Title>
        <Subtitle>
          Track, filter, and fulfil every customer order from one place. Update statuses and manage invoices in real time.
        </Subtitle>
      </PageHeader>

      {/* Stats */}
      <StatsRow ordersAfterDate={ordersAfterDate} orders={orders}/>
      {/* Controls */}
      <ControlOrders dateRange={dateRange} sortBy={sortBy} status={status}/>

      <ResultCount>
        Showing {ordersSorted.length} order{ordersSorted.length !== 1 ? "s" : ""}
        {dateRange !== "all" && ` in the last ${dateRange === "1d" ? "day" : dateRange === "7d" ? "7 days" : "30 days"}`}
      </ResultCount>

      {/* Desktop table */}
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <Th>Order</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>City</Th>
              <Th>Phone</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            { paginated.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <Empty>No orders match this filter.</Empty>
                </td>
              </tr>
            ) : (
               paginated.map((order) => (
                <Tr key={order.id}>
                  <Td>#{order.id}</Td>
                  <Td>
                    {(Number(order.final_amount) + shipping + surcharges).toLocaleString()} EGP
                  </Td>
                  <Td>
                    <Badge $status={order.status}>{order.status}</Badge>
                  </Td>
                  <Td>{order.city}</Td>
                  <Td style={{ color: "#64748b" }}>{order.phone}</Td>
                  <Td>
                    <EditModal>
                      <ContainerOrderDetails orderId={order.id} />
                    </EditModal>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      <Pagination totalCount={totalCount} pageSize={PAGE_SIZE} paramKey="page" />

      </TableWrap>

      {/* Mobile cards */}
      {ordersSorted.map((order) => (
        <MobileCard key={order.id}>
          <MobileRow>
            <MobileLabel>Order</MobileLabel>
            <strong>#{order.id}</strong>
          </MobileRow>
          <MobileRow>
            <MobileLabel>Amount</MobileLabel>
            <span>{(Number(order.final_amount) + shipping + surcharges).toLocaleString()} EGP</span>
          </MobileRow>
          <MobileRow>
            <MobileLabel>Status</MobileLabel>
            <Badge $status={order.status}>{order.status}</Badge>
          </MobileRow>
          <MobileRow>
            <MobileLabel>City</MobileLabel>
            <span>{order.city}</span>
          </MobileRow>
          <MobileRow>
            <MobileLabel>Actions</MobileLabel>
            <EditModal>
              <ContainerOrderDetails orderId={order.id} />
            </EditModal>
          </MobileRow>
        </MobileCard>
      ))}
    </Page>
  );
}