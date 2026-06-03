"use client";

import Image from "next/image";
import { memo } from "react";
import styled from "styled-components";
import ReusableButton from "@/app/ui/ReuseableButton";
import useDeleteCategory from "@/app/features/categories/useDeleteCategory";

const StyledCard = styled.div`
  background: var(--color-grey-100);
  border: 1px solid var(--color-grey-100);
  border-radius: 16px;
  overflow: hidden;           /* مهم جداً */
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
              box-shadow 0.35s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.1);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background-color: var(--color-grey-50);
  overflow: hidden;         
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const CatImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  
  transition: transform 0.5s ease;
  padding: 12px;              /* مسافة داخلية عشان الصورة متلزقش في الحواف */

  ${StyledCard}:hover & {
    transform: scale(1.06);
  }
`;

const Content = styled.div`
  padding: 1.8rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  flex-grow: 1;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex-grow: 1;

  h2 {
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--color-grey-800);
    margin: 0;
  }
  p {
    font-size: 1.3rem;
    color: var(--color-grey-500);
    line-height: 1.5;
    margin: 0;
  }
`;

const StatusBadge = styled.span`
  align-self: flex-start;
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.4rem 0.9rem;
  border-radius: 100px;
  background: ${({ $active }) => $active ? "rgba(34,197,94,0.12)" : "var(--color-grey-100)"};
  color: ${({ $active }) => $active ? "#15803d" : "var(--color-grey-600)"};
  z-index: 2;
`;

const Actions = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: auto;
`;

// ===================== Component =====================

const CardStyle = memo(function CardStyle({ category = {}, onEdit }) {
  const { deleteCategory, isLoading: isDeleting } = useDeleteCategory();

  return (
    <StyledCard>
      <ImageWrapper>
        <CatImage
          src={category.image}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          alt={category.name || "Category"}
        />
      </ImageWrapper>

      <Content>
        <Info>
          <StatusBadge $active={category.is_active}>
            {category.is_active ? "Active" : "Hidden"}
          </StatusBadge>
          <h2>{category.name}</h2>
          <p>{category.description || "No description."}</p>
        </Info>

        <Actions>
          <ReusableButton
            variant="danger"
            onClick={() => deleteCategory(category.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </ReusableButton>

          <ReusableButton onClick={() => onEdit(category)}>
            Edit
          </ReusableButton>
        </Actions>
      </Content>
    </StyledCard>
  );
});

export default CardStyle;