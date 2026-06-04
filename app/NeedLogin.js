"use client";

import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  text-align: center;
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.6rem;
  color: #666;
  margin-bottom: 2rem;
`;

const LoginLink = styled(Link)`
  display: inline-block;
  background: #4f46e5;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export default function NeedLogin() {
  return (
    <Container>
      <Box>
        <Title>Login Required</Title>

        <Text>
          You need to sign in to access this page and manage your account.
        </Text>

        <LoginLink href="/login">
          Go to Login
        </LoginLink>
      </Box>
    </Container>
  );
}