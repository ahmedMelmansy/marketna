"use client";

// HeaderCategories.js
// Receives onAddClick from parent — no modal state here.

import styled from "styled-components";

const HeaderContainer = styled.div`
  border-bottom: 1px solid var(--color-grey-100);
  padding: 2.4rem 3rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2rem;
`;

const MainHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TextGroup = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-grey-900);
    letter-spacing: -0.5px;
  }
  p {
    font-size: 1.4rem;
    color: var(--color-grey-500);
    margin-top: 0.4rem;
    line-height: 1.5;
  }
`;

const AddButton = styled.button`
  background: var(--color-brand-600);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  white-space: nowrap;

  &:hover {
    background: var(--color-brand-700);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79,70,229,0.25);
  }
  &:active { transform: translateY(1px); }

  @media (max-width: 600px) { width: 100%; justify-content: center; }
`;

export default function HeaderSections({ onAddClick , title ,description ,type }) {
  return (
    <HeaderContainer>
      <MainHeader>
        <TextGroup>
          <h2>{title}</h2>
          <p>{description}</p>
        </TextGroup>
        <AddButton onClick={onAddClick}>
          <span>+</span> {type}
        </AddButton>
      </MainHeader>
    </HeaderContainer>
  );
}