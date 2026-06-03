"use client";

import styled, { css } from "styled-components";
import { TiArrowSortedUp, TiArrowSortedDown, TiArrowUnsorted } from "react-icons/ti";

const THead = styled.thead`
  background: var(--color-grey-50);
  border-bottom: 2px solid var(--color-grey-100);
`;

const Th = styled.th`
  padding: 1.4rem 1.6rem;
  text-align: left;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-grey-500);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  white-space: nowrap;
  user-select: none;

  ${({ $sortable }) =>
    $sortable &&
    css`
      cursor: pointer;
      &:hover {
        color: var(--color-brand-600);
      }
    `}
`;

const ThInner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function SortIcon({ field, sortConfig }) {
  if (sortConfig.field !== field)
    return <TiArrowUnsorted />;

  return sortConfig.dir === "asc" ? (
    <TiArrowSortedUp />
  ) : (
    <TiArrowSortedDown />
  );
}

export default function TheadTable({ sortConfig, handleSort }) {
  return (
    <THead>
      <tr>
        <Th>SKU</Th>
        <Th>Image</Th>
        <Th>Product</Th>
        <Th>Description</Th>
        <Th>Brand</Th>

        <Th $sortable onClick={() => handleSort("stock")}>
          <ThInner>
            Stock <SortIcon field="stock" sortConfig={sortConfig} />
          </ThInner>
        </Th>

        <Th $sortable onClick={() => handleSort("price")}>
          <ThInner>
            Price <SortIcon field="price" sortConfig={sortConfig} />
          </ThInner>
        </Th>

        <Th>Status</Th>
        <Th>Actions</Th>
      </tr>
    </THead>
  );
}