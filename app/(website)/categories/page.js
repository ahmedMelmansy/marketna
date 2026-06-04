import { getCategories } from "@/app/services/apiCategories";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import CardCategory from "../websiteComponent/CardCategory";

const Section = styled.section`
  padding: 7rem 2rem;
  background: #fff;
`;

const Container = styled.div`
  width: min(1300px, 100%);
  margin: 0 auto;
`;

const Heading = styled.div`
  text-align: center;
  margin-bottom: 5rem;

  h2 {
    font-size: clamp(3rem, 5vw, 5rem);
    font-weight: 800;
    color: #0f172a;
    text-transform: capitalize;
    margin-bottom: 1rem;
  }

  p {
    color: #64748b;
    font-size: 1.6rem;
    max-width: 650px;
    margin: 0 auto;
    line-height: 1.7;
    
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
    @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;



const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  background: #f8fafc;
`;

const Content = styled.div`
  padding: 1.6rem;
  h4 {
    font-size: 1.7rem;
    font-weight: 700;
    color: #ffff;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    position: absolute;
    bottom: 40px;
  }

  span {
    font-size: 1.3rem;
    color: #64748b;
    display: none;
    font-weight: 500;
  }
`;

export default async function page() {
  const categories = await getCategories();

  return (
    <Section>
      <Container>
        <Heading>
          <h2>Featured Categories</h2>

          <p>
            Explore meticulously grouped premium collections curated
            for every lifestyle and need.
          </p>
        </Heading>
        <CategoriesGrid>
          {categories?.map((category) => (
            <CardCategory
              key={category.id}
              category={category}
            />
          ))}
        </CategoriesGrid>
      </Container>
    </Section>
  )
}
