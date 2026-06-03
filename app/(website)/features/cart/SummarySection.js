import Image from "next/image";
import { FiShoppingBag } from "react-icons/fi";
import styled from "styled-components";
import CheckOut from "../../cart/CheckOut";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import toast from "react-hot-toast";

const Section = styled.div`
  flex: 1;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid #f3f4f6;
  position: sticky;
  top: 2rem;

  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }

  @media (max-width: 968px) {
    position: static;
    width: 100%;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 1rem;
  position: relative;
  margin-bottom: 1.5rem;

  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: contain;
    background: #f9fafb;
    border: 1px solid #f3f4f6;
  }

  div {
    flex: 1;
    h4 { font-size: 1.3rem; font-weight: 600; color: #374151; }
    p { font-size: 1.2rem; color: #9ca3af; margin-top: 0.2rem; }
  }

  span {
    font-weight: 700;
    color: #111827;
    font-size: 1.3rem;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #111827;

  h3 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #111827;
  }

  span {
    font-size: 2rem;
    font-weight: 800;
    color: #4f46e5;
  }
`;

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
const ItemImage = styled.div`
  width: 100px;
  position: relative;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  background: #f9fafb;
  flex-shrink: 0;
  border: 1px solid #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default function SummarySection() {
  
  const { user } = useAuth();
  const {cart, getTotal} = useContext(CartContext)

  function handleCheckOut(){
    if(!user){
      toast.error(" login in first and CheckOut your cart items")
    }
  }
  return (
            <Section>
              <h2>Order Summary</h2>

              {cart.map((item) => (
                <SummaryItem key={item.id}>
                    <ItemImage >
                  <Image  src={item.main_image} fill alt={item.name} /></ItemImage>
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span>₹{((item.sale_price || item.price) * item.quantity).toLocaleString()}</span>
                </SummaryItem>
              ))}

              <TotalRow>
                <h3>Total Amount</h3>
                <span>₹{getTotal().toLocaleString()}</span>
              </TotalRow>
                <CheckOut/>
            </Section>
  )
}
