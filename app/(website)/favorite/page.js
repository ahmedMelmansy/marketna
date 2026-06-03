"use client";

import { useContext } from "react";
import styled from "styled-components";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { FiTrash2, FiHeart } from "react-icons/fi";
import Image from "next/image";
import EmptyState from "../features/favorite/EmptyState";
import FavoriteCard from "../features/favorite/FavoriteCard";

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const Grid = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
`
const PageHeader = styled.div`
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 1rem;
    
    svg {
      color: #ef4444;
      fill: #ef4444;
    }
  }

  p {
    font-size: 1.5rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    h1 { font-size: 2.2rem; }
    p { font-size: 1.3rem; }
  }
`;





export default function Page() {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  return (
    <PageWrapper>
      <Container>
        <PageHeader>
          <h1><FiHeart /> My Wishlist</h1>
          <p>{favorites.length} saved items</p>
        </PageHeader>
<Grid >
        {favorites.length === 0 ? (
          <EmptyState/>
        ) : (
          favorites.map((product) => (
            <FavoriteCard product={product} key={product.id} toggleFavorite={toggleFavorite}/>
          ))
        )}  </Grid>
      </Container>
    </PageWrapper>
  );
}