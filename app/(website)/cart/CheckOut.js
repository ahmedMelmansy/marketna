"use client"
import ModalCheckOut from "@/app/(website)/websiteComponent/ModalCheckOut";
import { FiShoppingBag } from "react-icons/fi";
import FormCheckOut from "../features/cart/FormCheckOut";
import styled from "styled-components";
import { useAuth } from "@/app/context/AuthContext";
import toast from "react-hot-toast";
const CheckoutBtn = styled.button`
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 1.8rem;
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
  }
`;
export default function CheckOut() {
const { user } = useAuth();


    return (
      <> 
<ModalCheckOut>
  <ModalCheckOut.Open opens="CheckOut">
    <CheckoutBtn >
      <FiShoppingBag />
      Proceed to Checkout
    </CheckoutBtn>
  </ModalCheckOut.Open>
{user &&
  <ModalCheckOut.Window name="CheckOut">
    <FormCheckOut />
  </ModalCheckOut.Window>
}
</ModalCheckOut>

</>
)
}
