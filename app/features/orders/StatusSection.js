"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import useUpdateOrder from "./useUpdateOrder";

const Status = styled.div`
  margin-bottom: 2.5rem;
`;

const StatusTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e2937;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: #3b82f6;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const DeliveredMessage = styled.div`
  padding: 14px 16px;
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.3rem;
`;

export default function StatusSection({ orderId, order }) {
  const { updateThisOrder, isLoading: isUpdating } = useUpdateOrder();
  const [currentStatus, setCurrentStatus] = useState("pending");

  useEffect(() => {
    if (order) {
      const status = Array.isArray(order) ? order[0]?.status : order?.status;
      if (status) setCurrentStatus(status);
    }
  }, [order]);

  return (
    <Status>
      <StatusTitle>
        Status —{" "}
        <span style={{ color: "#3b82f6", textTransform: "capitalize" }}>
          {currentStatus}
        </span>
      </StatusTitle>

      {currentStatus === "pending" && (
        <ActionButton
          onClick={() => updateThisOrder({ orderId, status: "shipped" })}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Mark as Shipped"}
        </ActionButton>
      )}

      {currentStatus === "shipped" && (
        <ActionButton
          onClick={() => updateThisOrder({ orderId, status: "delivered" })}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Mark as Delivered"}
        </ActionButton>
      )}

      {currentStatus === "delivered" && (
        <DeliveredMessage>Order has been delivered successfully ✓</DeliveredMessage>
      )}
    </Status>
  );
}