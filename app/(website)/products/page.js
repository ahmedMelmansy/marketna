import { Suspense } from "react";
import ProductGrid from "../features/Products/ProductGrid";
import { getProducts } from "../services/service";
import Loading from "../websiteComponent/Loading";
import styled from "styled-components";

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc; 
`;

const PageHeader = styled.div`
  background-color: #ffffff;
  padding: 6rem 2rem 4rem;
  text-align: center;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem 3rem;
    margin-bottom: 2rem;
  }
`;

const TopTag = styled.span`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #4f46e5; 
  background: rgba(79, 70, 229, 0.1);
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  margin-bottom: 1.5rem;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 4rem 6rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 4rem;
  }
`;

export default async function ProductsPage() {
  // بجيب الداتا في الـ Server Component
  const product = await getProducts();
 
  return (
    <PageWrapper>
      
      <PageHeader>
        <TopTag>Our Inventory</TopTag>
        <MainTitle>Explore All Products</MainTitle>
        <Description>
          Handpicked premium items crafted for the modern lifestyle. Discover the quality that sets us apart.
        </Description>
      </PageHeader>

      <GridContainer>
        <Suspense fallback={<Loading />}>
          <ProductGrid products={product}/>
        </Suspense>
      </GridContainer>

    </PageWrapper>
  );
}