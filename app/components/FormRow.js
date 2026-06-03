import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;

  grid-template-columns: 14rem 1fr;

  gap: 1.6rem;

  align-items: center;

  padding: 1.6rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const Error = styled.span`
  grid-column: 2;

  font-size: 1.2rem;

  color: var(--color-danger);

  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

export default function FormRow({
  label,
  error,
  children,
}) {
  return (
    <StyledFormRow>
      {label && (
        <Label htmlFor={children?.props?.id}>
          {label}
        </Label>
      )}

      {children}

      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}