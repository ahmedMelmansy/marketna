"use client";

import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.variant === 'danger' ? 'var(--color-red-700, #dc2626)' : 'var(--color-brand-600, #4f46e5)'};
  color: white;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: var(--border-radius-md, 8px);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;

  &:hover {
    background-color: ${props => props.variant === 'danger' ? 'var(--color-red-800, #b91c1c)' : 'var(--color-brand-700, #4338ca)'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default function ReusableButton({ children, variant, onClick, ...props }) {
  return (
    <StyledButton variant={variant} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
}