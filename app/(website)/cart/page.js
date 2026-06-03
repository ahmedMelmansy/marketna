"use client";

import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import ContainerPage from "./ContainerPage";

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;



export default function CartPage() {
  const { cart} = useContext(CartContext);



  return (
    <PageWrapper>
      <ContainerPage cart={cart}/>
    </PageWrapper>
  );
}