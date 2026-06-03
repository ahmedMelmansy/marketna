"use client";

import styled from "styled-components";

const StyledHeader = styled.header`
  height: 5rem;

  border-bottom: 1px solid var(--color-grey-900);

  background-color: var(--color-brand-0);

  padding: 0 4rem;
  margin: 3rem 0 ;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h2>Dashboard</h2>

      <div>User</div>
    </StyledHeader>
  );
}