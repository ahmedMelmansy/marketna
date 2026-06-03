import React, { Suspense } from 'react'
import { FiShoppingBag } from 'react-icons/fi'
import styled from 'styled-components';
import ItemSection from '../features/cart/ItemSection';
import SummarySection from '../features/cart/SummarySection';
import Loading from '../websiteComponent/Loading';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 3rem;
`;

const CartLayout = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  background: white;
  border-radius: 16px;
  border: 1px dashed #e5e7eb;

  svg {
    font-size: 4rem;
    color: #d1d5db;
    margin-bottom: 1rem;
  }

  h2 { font-size: 2rem; color: #374151; margin-bottom: 1rem; }
  p { font-size: 1.4rem; color: #9ca3af; }
`;
export default function ContainerPage({cart}) {  
   

  return (
      <Container>
        <PageTitle>Shopping Cart ({cart.length})</PageTitle>

        {cart.length === 0 ? (
          <EmptyCart>
            <FiShoppingBag />
            <h2>Your cart is empty</h2>
            <p>Looks like you have not added anything yet.</p>
          </EmptyCart>
        ) : (
          <Suspense fallback={<Loading/>}>
          <CartLayout>
            
            <ItemSection cart={cart}/>
            
            <SummarySection cart={cart}/>
          </CartLayout>
          </Suspense>
        )}
      </Container>
  )
}
