"use client";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";
import Empty from "@/app/(website)/websiteComponent/Empty";
import { useAuth } from "@/app/context/AuthContext";
import NeedLogin from "@/app/NeedLogin";
const Section = styled.section`
  padding: 5rem 2rem 7rem;
`;

const Container = styled.div`
  width: min(1300px, 100%);
  margin: 0 auto;
`;

const Hero = styled.div`
  margin-bottom: 5rem;
  text-align: center;

  h1 {
    font-size: clamp(3rem, 5vw, 5.5rem);
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1.2rem;
    text-transform: capitalize;
  }

  p {
    max-width: 750px;
    margin: 0 auto;
    color: #64748b;
    font-size: 1.6rem;
    line-height: 1.8;
  }
`;


export default function ProductsCategory({category,products}) {
    const{user} = useAuth()
   
    if(!user) return <NeedLogin/>
   
  return (
    <Section>
      <Container>
        {/* CATEGORY INFO */}
        <Hero>
          <h1>{category.name}</h1>

          <p>
            {category.description}
          </p>
        </Hero>

        
        <ProductGrid products={products}/>
        {/* PRODUCTS */}

      </Container>
    </Section>
  );
}