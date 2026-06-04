"use client";

import styled from "styled-components";
import ProductOrder from "./ProductOrder";
import useOrderItemsId from "./useOrderItemsId";
import useProducts from "./useProducts";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem 0.8rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #e2e8f0;
  background: #f8fafc;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export default function TableOrders({ orderId }) {
  const { orderItems, isLoading: loadingItems } = useOrderItemsId(orderId);
  const { products, isLoading: loadingProducts } = useProducts();

  if (loadingItems || loadingProducts) {
    return <p style={{ fontSize: "1.3rem", color: "#64748b" }}>Loading items...</p>;
  }

  const orderProducts = orderItems?.map((orderItem) => {
    const product = products?.find((p) => p.id === orderItem.product_id);
    return {
      ...product,
      quantity: orderItem.quantity,
    };
  });

  return (
    <Table>
      <thead>
        <tr>
          <Th>Product</Th>
          <Th>Price</Th>
          <Th>Qty</Th>
          <Th style={{ textAlign: "right" }}>Subtotal</Th>
        </tr>
      </thead>
      <tbody>
        {orderProducts?.map((item, index) => (
          <ProductOrder key={item?.id || index} item={item} index={index} />
        ))}
      </tbody>
    </Table>
  );
}