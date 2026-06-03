import React from 'react'
import ProductCard from './ProductCard'
import styled from 'styled-components';

const Container = styled.div`
  width: min(1300px, 100%);
  margin: 3rem auto ;
`;
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;
export default function ProductGrid({products}) {
  return (
    <Container>
        <ProductsGrid>
          {products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ProductsGrid></Container>
  )
}
