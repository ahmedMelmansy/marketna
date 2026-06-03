"use client";

import Image from "next/image";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";

const Tr = styled.tr`
  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const Td = styled.td`
  padding: 1.2rem 1rem;
  border-bottom: 1px solid var(--color-grey-100);
  vertical-align: middle;
`;

const SkuBadge = styled.span`
  background-color: var(--color-grey-100);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  font-family: monospace;
`;

const ImgWrap = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-grey-100);
`;

const NoImg = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-100);
  color: var(--color-grey-400);
  border-radius: 8px;
  font-size: 1.2rem;
`;

const ProductName = styled.div`
  font-weight: bold;
  color: var(--color-grey-800);
  font-size: 1rem;
`;

const DescText = styled.div`
  color: var(--color-grey-500);
  font-size: 1.35rem;
  line-height: 1.45;
  max-width: 200px;
  display: -webkit-box;
  -webkit-line-clamp: 2;           /* عدد الأسطر */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BrandText = styled.div`
  color: var(--color-grey-600);
`;

const StockCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: ${(props) => (props.$low ? "var(--color-red-700)" : "var(--color-green-700)")};
`;

const StockDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.$low ? "#ef4444" : "#22c55e")};
`;

const PriceCell = styled.div`
  font-weight: 600;
  color: var(--color-brand-600);
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 1.3rem;
  font-weight: 600;
  ${(props) =>
    props.$active
      ? `
    background-color: #dcfce7;
    color: #15803d;
  `
      : `
    background-color: #fee2e2;
    color: #dc2626;
  `}
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: var(--color-grey-500);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &.delete:hover {
    color: var(--color-red-600);
  }
`;

export default function RowProduct({
  product,
  isBeingDeleted,
  deleteProduct,
  initialCategories,
}) {
  return (
    <Tr style={{ opacity: isBeingDeleted ? 0.4 : 1 }}>
      {/* SKU */}
      <Td>
        <SkuBadge>{product.sku || "—"}</SkuBadge>
      </Td>

      {/* Image */}
      <Td>
        {product.main_image ? (
          <ImgWrap>
            <Image
              src={product.main_image}
              alt={product.name}
              fill
              sizes="52px"
              style={{ objectFit: "contain" }}
            />
          </ImgWrap>
        ) : (
          <NoImg>N/A</NoImg>
        )}
      </Td>

      {/* Name */}
      <Td>
        <ProductName title={product.name}>{product.name}</ProductName>
      </Td>

      {/* Description */}
      <Td>
        <DescText title={product.description}>
          {product.description?.slice(0, 60)}
          {product.description?.length > 60 && "…"}
        </DescText>
      </Td>

      {/* Brand */}
      <Td>
        <BrandText>{product.brand || "—"}</BrandText>
      </Td>

      {/* Stock */}
      <Td>
        <StockCell $low={product.stock < 10}>
          <StockDot $low={product.stock < 10} />
          {product.stock}
        </StockCell>
      </Td>

      {/* Price */}
      <Td>
        <PriceCell>
          {product.price?.toLocaleString("en-EG")} EGP
        </PriceCell>
      </Td>

      {/* Status */}
      <Td>
        <StatusBadge $active={product.is_active}>
          {product.is_active ? "Active" : "Inactive"}
        </StatusBadge>
      </Td>

      {/* Actions */}
      <Td>
        <Actions>
          <ViewModal product={product} />
          <EditModal
            product={product}
            initialCategories={initialCategories}
          />
          <ActionBtn
            className="delete"
            title="Delete"
            onClick={() => deleteProduct(product.id)}
            disabled={isBeingDeleted}
          >
            <MdDelete size={20} />
          </ActionBtn>
        </Actions>
      </Td>
    </Tr>
  );
}