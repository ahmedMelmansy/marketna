import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Card = styled(Link)`
  position: relative;
  display: block;
  border-radius: 28px;
  overflow: hidden;
  height: 320px;

  transition: 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 35px rgba(15, 23, 42, 0.12);
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to top,
    rgba(15, 23, 42, 0.85),
    rgba(15, 23, 42, 0.1)
  );

  z-index: 2;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    transition: 0.35s ease;
  }
`;

const Content = styled.div`
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  z-index: 3;

  h4 {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    margin-bottom: 0.6rem;

    text-transform: capitalize;
  }

  span {
    font-size: 1.35rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }
`;

export default function CardCategory({ category }) {
  return (
    <Card href={`/categories/${category.id}`}>
      <Overlay />

      <ImageWrapper>
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="
            (max-width: 768px) 50vw,
            (max-width: 1200px) 25vw,
            20vw
          "
          style={{
            objectFit: "cover",
          }}
        />
      </ImageWrapper>

      <Content>
        <h4>{category.name}</h4>

        <span>Explore collections</span>
      </Content>
    </Card>
  );
}