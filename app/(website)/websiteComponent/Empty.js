"use client";

import styled from "styled-components";

const StyledEmpty = styled.div`
  padding: 4rem;

  text-align: center;

  font-size: 1.8rem;
  font-weight: 500;

  color: var(--color-grey-500);
`;

export default function Empty({
  resourceName,
}) {
  return (
    <StyledEmpty>
 {resourceName} .
    </StyledEmpty>
  );
}