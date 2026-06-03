"use client";


import Form from "@/app/components/Form";
import FormRow from "@/app/components/FormRow";
import Input from "@/app/components/Input";
import { use, useContext } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CartContext } from "../../contexts/CartContext";

import useCreateOrder from "./useCreateOrder";
import useCreateOrderItems from "./useCreateOrderItems";
import { updateProduct } from "../../services/service";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export function generateSKU({ brand = "", name = "" }) {
  const shortBrand = brand.slice(0, 3).toUpperCase() || "BRD";
  const shortName = name.slice(0, 3).toUpperCase() || "PRD";
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${shortBrand}-${shortName}-${randomNum}`;
}

const StyledSelect = styled.select`
  width: 100%;
  padding: 1.1rem 1.4rem;
  border: 1.5px solid var(--color-grey-300);
  border-radius: 10px;
  background: var(--color-grey-0);
  font-size: 1.4rem;
  color: var(--color-grey-700);
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: var(--color-brand-500);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 2rem;
  padding: 1.3rem;
  background: var(--color-brand-600);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;
  &:hover:not(:disabled) {
    background: var(--color-brand-700);
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function FormCheckOut() {
    const {
    register,
    formState: { errors },
    handleSubmit,
} = useForm({});

const {createNewOrder}=useCreateOrder()
const { createNewOrderItem} = useCreateOrderItems()
const {cart , getTotal ,clearCart} = useContext(CartContext)
const discount = 0;
const total = getTotal()
const final = getTotal() - discount;
const { user } = useAuth();
  


async function onSubmit(data) {
  if (!user) {
    toast.error("Please login first");
    return;
  }
  const productData = {
    ...data,
    total_amount: total,
    discount_amount: discount,
    final_amount: final,
    status:"pending" ,
    payment_status: data.payment_status === "true",
    user_id:user.id
}

const order = await createNewOrder(productData)

const orderItems = cart.map((item) => ({
  order_id: order.id,
  
  product_id: item.id,
  quantity: item.quantity,
  price_at_time: item.sale_price || item.price,
  discount_at_time : item.discount_percentage,
     total_price:
      (item.sale_price || item.price) * item.quantity,
}));
createNewOrderItem(orderItems)
for (const item of cart) {
  await updateProduct(item.id, {
    stock: item.stock - item.quantity,
  });
}
clearCart()

}
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

            <FormRow label="fullName " error={errors?.fullName?.message}>
        <Input
          type="text"
          placeholder="fullName "
          id="fullName"
          {...register("fullName", {
            required: "fullName is required",
          })}
        />
      </FormRow>

            <FormRow label="email " error={errors?.email?.message}>
        <Input
          type="text"
          placeholder="email "
          id="email"
          {...register("email", {
            required: "email is required",
          })}
        />
      </FormRow>

            <FormRow label="shipping_address" error={errors?.shipping_address?.message}>
        <Input
          type="text"
          placeholder="shipping_address"
          id="shipping_address"
          {...register("shipping_address", { required: "shipping_address is required" })}
        />
      </FormRow>
            <FormRow label="city" error={errors?.city?.message}>
        <Input
          type="text"
          placeholder="city"
          id="city"
          {...register("city", { required: "city is required" })}
        />
      </FormRow>
            <FormRow label="phone" error={errors?.phone?.message}>
        <Input
          type="text"
          placeholder="phone"
          id="phone"
          {...register("phone", { required: "phone is required" })}
        />
      </FormRow>
            <FormRow label="notes" error={errors?.notes?.message}>
        <Input
          type="text"
          placeholder="notes"
          id="notes"
          {...register("notes", { required: "notes is required" })}
        />
      </FormRow>
      <FormRow label="payment_status">
          <StyledSelect
            id="payment_status"
            {...register("payment_status")}
          >
            <option value="false">Cash On Delivery</option>
            <option value="true">Paid Online</option>
          </StyledSelect>
      </FormRow>
      <SubmitButton type="submit" >
        CheckOut
      </SubmitButton>
    </Form>
  );
}
