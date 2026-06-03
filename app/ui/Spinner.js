"use client";

import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const StyledSpinner = styled.div`
  width: 4.8rem;
  height: 4.8rem;

  border: 5px solid var(--color-grey-200);
  border-top-color: var(--color-brand-500);

  border-radius: 50%;

  animation: ${rotate} 1s infinite linear;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4rem;
`;

export default function Spinner() {
  return (
    <SpinnerContainer>
      <StyledSpinner />
    </SpinnerContainer>
  );
}