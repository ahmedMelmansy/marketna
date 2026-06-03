"use client";

import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border-radius: 24px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e2e8f0;
`;

const ImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1/1;

  background: #e2e8f0;

  animation: ${pulse} 1.4s infinite ease-in-out;
`;

const Content = styled.div`
  padding: 1.6rem;
`;

const Line = styled.div`
  height: ${({ height }) => height || "14px"};
  width: ${({ width }) => width || "100%"};

  border-radius: 100px;
  background: #e2e8f0;

  margin-bottom: 1rem;

  animation: ${pulse} 1.4s infinite ease-in-out;
`;

export default function Loading({
  cards = 8,
}) {
  return (
    <Wrapper>
      <Grid>
        {Array.from({ length: cards }).map((_, i) => (
          <Card key={i}>
            <ImageSkeleton />

            <Content>
              <Line height="20px" width="70%" />

              <Line width="45%" />

              <Line width="90%" />
            </Content>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}