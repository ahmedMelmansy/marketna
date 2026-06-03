"use client";

import styled from "styled-components";
import { PackageSearch } from "lucide-react";

const EmptyWrapper = styled.div`
  width: 100%;
  min-height: 350px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4rem 2rem;
`;

const EmptyContent = styled.div`
  text-align: center;
  max-width: 450px;

  svg {
    width: 72px;
    height: 72px;
    color: #94a3b8;
    margin-bottom: 1.8rem;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.7;
    color: #64748b;
  }
`;

export default function EmptyPage({
  title = "No items found",
  description = "There are currently no items to display.",
}) {
  return (
    <EmptyWrapper>
      <EmptyContent>
        <PackageSearch />

        <h3>{title}</h3>

        <p>{description}</p>
      </EmptyContent>
    </EmptyWrapper>
  );
}