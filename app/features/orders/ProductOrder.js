"use client";

import Image from "next/image";
import styled from "styled-components";

const Tr = styled.tr`
  &:hover td {
    background: #f8fafc;
  }
`;

const Td = styled.td`
  padding: 1.2rem 0.8rem;
  font-size: 1.3rem;
  border-bottom: 1px solid #f1f5f9;
  color: #1e2937;
  vertical-align: middle;
`;

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ImgWrap = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 10px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
`;

const ProductName = styled.p`
  font-weight: 600;
  font-size: 1.3rem;
  color: #0f172a;
  margin: 0 0 2px;
`;

const ProductBrand = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
`;

export default function ProductOrder({ item, index }) {
  if (!item) return null;

  const price = item.sale_price || item.price || 0;
  const subtotal = price * (item.quantity || 1);

  return (
    <Tr>
      <Td>
        <ProductCell>
          {item.main_image ? (
            <ImgWrap>
              <Image
                src={item.main_image}
                alt={item.name || "product"}
                fill
                sizes="52px"
                style={{ objectFit: "contain", padding: "4px" }}
              />
            </ImgWrap>
          ) : (
            <ImgWrap style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: "#94a3b8" }}>
              N/A
            </ImgWrap>
          )}
          <div>
            <ProductName>{item.name || "—"}</ProductName>
            <ProductBrand>{item.brand || ""}</ProductBrand>
          </div>
        </ProductCell>
      </Td>
      <Td>{price.toLocaleString()} EGP</Td>
      <Td>{item.quantity || 1}</Td>
      <Td style={{ textAlign: "right", fontWeight: 600 }}>
        {subtotal.toLocaleString()} EGP
      </Td>
    </Tr>
  );
}