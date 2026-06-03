"use client";

import styled from "styled-components";

import Form from "@/app/components/Form";
import FormRow from "@/app/components/FormRow";
import Input from "@/app/components/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "../auth/apiAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8fafc;
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  border: 1px solid #e2e8f0;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  text-align: center;
  color: #64748b;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  background-color: #0f172a;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const SignupText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #64748b;
`;

const LinkText = styled(Link)`
  color: #0f172a;
  font-weight: 600;
  cursor: pointer;
`;
export default function Page() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 

  async function onSubmit(data) {
    const { email, password } = data;

    if (loading) return;
    setLoading(true);

    try {
      const { data: authData, error } = await signIn(email, password);

      if (error) throw error;


      toast.success("Login successful 🎉");

      router.push("/");

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong  email or password is incorrect");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Card>
        <Heading>Welcome Back</Heading>

        <Text>Sign in to your account</Text>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="Email">
            <Input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
            />
          </FormRow>

          <FormRow label="Password">
            <Input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter password"
            />
          </FormRow>

          <Button disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </Form>

        <SignupText>
          Don&apos;t have an account?{" "}
          <LinkText href="/signup">Sign Up</LinkText>
        </SignupText>
      </Card>
    </Container>
  );
}