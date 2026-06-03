"use client";

import styled from "styled-components";

import Form from "@/app/components/Form";
import FormRow from "@/app/components/FormRow";
import Input from "@/app/components/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUp } from "../auth/apiAuth";
import { useState } from "react";
import useAddProfile from "../features/profiles/useAddProfile";
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
  max-width: 550px;
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

const LoginText = styled.p`
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
 const { register, handleSubmit, getValues } = useForm();
const [loading, setLoading] = useState(false);
const {addProfile,isAdding} = useAddProfile()
async function onSubmit(data) {
  const { email, password, fullName, phone, address } = data;

  if (loading) return;
  setLoading(true);

  try {
    const { data: authData, error } = await signUp(email, password);

    if (error) {
      if (error.message === "User already registered") {
        toast.error("Email already exists");
        return;
      }
      throw error;
    }

    const user = authData?.user;

    if (!user) {
      throw new Error("No user returned");
    }

    await addProfile({
      id: user.id,
      full_name: fullName,
      email,
      phone,
      address,
    });

  } catch (err) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
}
  return (
    <Container>
      <Card>
        <Heading>Create Account</Heading>

        <Text>Create your account to start shopping</Text>

        <Form onSubmit={handleSubmit(onSubmit)}>
          
          <FormRow label="Full Name">
            <Input
              {...register("fullName", { required: true })}
              placeholder="Enter your full name"
            />
          </FormRow>

          <FormRow label="Email">
            <Input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
            />
          </FormRow>

          <FormRow label="Phone">
            <Input
              {...register("phone")}
              placeholder="Enter your phone"
            />
          </FormRow>

          <FormRow label="Address">
            <Input
              {...register("address")}
              placeholder="Enter your address"
            />
          </FormRow>

          <FormRow label="Password">
            <Input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter password"
            />
          </FormRow>

          <FormRow label="Confirm Password">
            <Input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              placeholder="Confirm password"
            />
          </FormRow>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
        </Button>
        </Form>

        <LoginText>
          Already have an account? <LinkText href="/login">Login</LinkText>
        </LoginText>
      </Card>
    </Container>
  );
}