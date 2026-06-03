"use client";

// CategoryGrid.js
//
// Pure presentational: receives categories + callback, renders cards.
// No modal state here — zero.

import styled from "styled-components";
import { memo } from "react";
import CardStyle from "@/app/components/features/categories/CardStyle";
import Empty from "@/app/(website)/websiteComponent/Empty";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2.4rem;
  padding: 3rem;
  background-color: var(--color-grey-50);
`;

// memo: grid only re-renders when categories array or onEdit ref changes.
// Because onEdit is wrapped in useCallback in the parent, this is stable.
const CategoryGrid = memo(function CategoryGrid({ categories, onEdit }) {
  if (!categories?.length) return <Empty resourceName="categories" />;

  return (
    <Grid>
      {categories.map((category) => (
        <CardStyle
          key={category.id}
          category={category}
          onEdit={onEdit}
        />
      ))}
    </Grid>
  );
});

export default CategoryGrid;