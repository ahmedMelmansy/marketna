"use client";

import styled from "styled-components";
import { shipping, surcharges } from "@/app/utils/Constant";
import useUpdateOrder from "./useUpdateOrder";

const SummaryOrder = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e2e8f0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 0;
  font-size: 1.2rem;
`;

const Label = styled.span`
  color: #475569;
`;

const Total = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
`;

const CompleteButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 1.2rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  background: #10b981;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default function Summary({ order, orderId }) {
  const { updateThisOrder, isLoading: isUpdating } = useUpdateOrder();

  const currentOrder = Array.isArray(order) ? order[0] : order;
  const subtotal = currentOrder?.final_amount ?? 0;
  const invoiceTotal = subtotal + shipping + surcharges;

  return (
    <SummaryOrder>
      <SummaryRow>
        <Label>Cart subtotal:</Label>
        <span>{subtotal.toLocaleString()} EGP</span>
      </SummaryRow>
      <SummaryRow>
        <Label>Shipping:</Label>
        <span>{shipping} EGP</span>
      </SummaryRow>
      <SummaryRow>
        <Label>Surcharges & insurance:</Label>
        <span>{surcharges} EGP</span>
      </SummaryRow>
      <SummaryRow>
        <Label style={{ fontWeight: "700", fontSize: "1.4rem" }}>Invoice total:</Label>
        <Total>{invoiceTotal.toLocaleString()} EGP</Total>
      </SummaryRow>

      {currentOrder?.status !== "completed" && currentOrder?.status === "delivered"&&
      (
        <CompleteButton
          disabled={isUpdating}
          onClick={() => updateThisOrder({ orderId, status: "completed" })}
        >
          {isUpdating ? "Updating..." : "Complete Order"}
        </CompleteButton>
      )}
    </SummaryOrder>
  );
}