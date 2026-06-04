"use client";

import Image from "next/image";
import styled, { keyframes, css } from "styled-components";
import { useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import useDeleteProduct from "./useDeleteProduct";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import TheadTable from "./TheadTable";
import RowProduct from "./RowProduct";
import Pagination from "@/app/ui/Pagination";
import { useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/app/utils/Constant";

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const rowHover = keyframes`
  from { background: transparent; }
  to   { background: var(--color-grey-50); }
`;

// ─── Wrapper ─────────────────────────────────────────────────────────────────

const TableContainer = styled.div`
  background: var(--color-grey-0);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--color-grey-100);
  margin: 2rem 0;
`;

const ScrollWrap = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar { height: 5px; }
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 100px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.35rem;
  min-width: 900px;
`;


// ─── Body ─────────────────────────────────────────────────────────────────────

const TBody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid var(--color-grey-100);
  transition: background 0.18s;
  animation: ${fadeIn} 0.3s ease both;
  animation-delay: ${({ $index }) => $index * 0.04}s;

  &:last-child { border-bottom: none; }
  &:hover { background: var(--color-grey-50); }
`;

const Td = styled.td`
  padding: 1.4rem 1.6rem;
  vertical-align: middle;
  color: var(--color-grey-700);
`;

// ─── Cells ────────────────────────────────────────────────────────────────────

const SkuBadge = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  font-family: "Courier New", monospace;
  color: var(--color-brand-600);
  background: var(--color-brand-50);
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  letter-spacing: 0.3px;
  white-space: nowrap;
`;

const ImgWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  overflow: hidden;
  border: 1.5px solid var(--color-grey-100);
  background: var(--color-grey-50);
  position: relative;
  flex-shrink: 0;
`;

const NoImg = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--color-grey-400);
  border: 1.5px solid var(--color-grey-200);
`;

const ProductName = styled.div`
  font-weight: 600;
  color: var(--color-grey-800);
  font-size: 1.4rem;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescText = styled.div`
  color: var(--color-grey-500);
  font-size: 1.3rem;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BrandText = styled.div`
  color: var(--color-grey-600);
  font-size: 1.3rem;
  font-weight: 500;
`;

// Price cell
const PriceCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: var(--color-grey-800);
  font-size: 1.4rem;
  white-space: nowrap;
`;

// Stock cell
const StockCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.4rem;
  color: ${({ $low }) =>
    $low ? "var(--color-danger, #ef4444)" : "var(--color-grey-800)"};
`;

const StockDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $low }) =>
    $low ? "var(--color-danger, #ef4444)" : "var(--color-success, #22c55e)"};
  flex-shrink: 0;
`;

const StatusBadge = styled.span`
  padding: 0.4rem 1.1rem;
  border-radius: 100px;
  font-size: 1.15rem;
  font-weight: 700;
  white-space: nowrap;
  background: ${({ $active }) => ($active ? "#dcfce7" : "#fee2e2")};
  color: ${({ $active }) => ($active ? "#15803d" : "#dc2626")};
`;

// Actions
const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const ActionBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1.5px solid var(--color-grey-200);
  background: var(--color-grey-0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.18s;
  color: var(--color-grey-500);
  font-size: 1.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  &.view:hover  { background: var(--color-brand-50);  color: var(--color-brand-600); border-color: var(--color-brand-200); }
  &.edit:hover  { background: #fef9c3; color: #a16207; border-color: #fde68a; }
  &.delete:hover{ background: #fee2e2; color: #dc2626; border-color: #fca5a5; }
`;

// Empty state
const EmptyRow = styled.tr`
  td {
    padding: 4rem;
    text-align: center;
    color: var(--color-grey-400);
    font-size: 1.5rem;
  }
`;



export default function TableProducts({ products = [] ,initialCategories }) {
  const { deleteProduct, isLoading: isDeleting, deletingId } = useDeleteProduct();
  const [sortConfig, setSortConfig] = useState({ field: null, dir: "asc" });
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function handleSort(field) {
    setSortConfig((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { field, dir: "asc" }
    );
  }

  const sorted = useMemo(() => {
    if (!sortConfig.field) return products;
    return [...products].sort((a, b) => {
      const aVal = a[sortConfig.field] ?? 0;
      const bVal = b[sortConfig.field] ?? 0;
      return sortConfig.dir === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [products, sortConfig]);

 const totalCount = sorted.length;
  const paginated  = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );


  return (
    <TableContainer>
      <ScrollWrap>
        <StyledTable>
          <TheadTable sortConfig={sortConfig} handleSort={handleSort}/>
          <TBody>
            {paginated.length === 0 && (
              <EmptyRow>
                <td colSpan={9}>No products found.</td>
              </EmptyRow>
            )}

            {paginated.map((product, i) => {
              const isBeingDeleted = isDeleting && deletingId === product.id;

              return (
              <RowProduct
                  key={product.id}
                  product={product}
                  isBeingDeleted={isBeingDeleted}
                  deleteProduct={deleteProduct}
                  initialCategories={initialCategories}
                />
              );
            })}
          </TBody>
          
        </StyledTable>  
        <Pagination totalCount={totalCount} pageSize={PAGE_SIZE} paramKey="page" />
      </ScrollWrap>
    </TableContainer>
  );
}