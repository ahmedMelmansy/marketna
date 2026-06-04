"use client";

import styled from "styled-components";
import StatusSection from "./StatusSection";
import TableOrders from "./TableOrders";
import Summary from "./Summary";
import useGetOrderId from "./useGetOrderId";

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 950px;
  margin: 0 auto;
  color: #1e2937;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default function ContainerOrderDetails({ orderId }) {
  const { order, isLoading: orderLoading } = useGetOrderId(orderId);

  if (orderLoading) {
    return <p style={{ padding: "2rem", fontSize: "1.3rem", color: "#64748b" }}>Loading order details...</p>;
  }

  return (
    <ModalContent>
      <Title>Order #{orderId} — details</Title>
      <StatusSection orderId={orderId} order={order} />
      <TableOrders orderId={orderId} />
      <Summary order={order} orderId={orderId} />
    </ModalContent>
  );
}