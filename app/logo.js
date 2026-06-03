
import styled from "styled-components";
import Image from "next/image";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 2rem;

  border-bottom: 1px solid var(--color-grey-200);

  img {
    object-fit: cover;
  }

  h1 {
    font-size: 1.4rem;
    font-weight: 700;

    background: linear-gradient(
      to right,
      #7c3aed,
      #2563eb
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: .8rem;
    color: var(--color-grey-500);

    margin-top: -0.4rem;
  }
`;

export default function Logo() {
  return (
    <StyledLogo>
      <Image
        src="/logo.png"
        sizes="2"
        loading="eager"
        fill
        alt="Marketna Logo"
      />
    </StyledLogo>
  );
}