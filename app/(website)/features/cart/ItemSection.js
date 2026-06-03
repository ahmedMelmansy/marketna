import Image from "next/image";
import { useContext } from "react";
import { FiMinus, FiPlus, FiTrash2, FiZap } from "react-icons/fi";
import styled from "styled-components";
import { CartContext } from "../../contexts/CartContext";

const Section = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #f3f4f6;
  transition: all 0.2s ease;

  &:hover {
    border-color: #e0e7ff;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.05);
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
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

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #111827;
  }

  span {
    font-size: 1.4rem;
    color: #6b7280;
  }
`;

const ItemPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #111827;
  min-width: 100px;
  text-align: right;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const QtyBtn = styled.button`
  background: none;
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  cursor: pointer;
  color: #4f46e5;
  transition: background 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const QtyValue = styled.span`
  padding: 0 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  min-width: 30px;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    margin-top: 1rem;
  }
`;

const ActionBtn = styled.button`
  background: none;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  transition: all 0.2s ease;

  &.delete {
    color: #ef4444;
    &:hover { background: #fef2f2; border-color: #fecaca; }
  }

  &.quick-buy {
    color: #4f46e5;
    &:hover { background: #eef2ff; border-color: #c7d2fe; }
  }
`;


export default function ItemSection({cart}) {
    const { updateQuantity ,deleteProductFormCart} = useContext(CartContext)
  return (
            <Section>
              {cart.map((item) => (
                <ItemCard key={item.id}>
                  <ItemImage>
                    <Image fill src={item.main_image} alt={item.name} />
                  </ItemImage>
                  
                  <ItemInfo>
                    <h3>{item.name}</h3>
                    <span>{item.brand}</span>
                  </ItemInfo>

                  <QuantityControl>
                    <QtyBtn onClick={() => updateQuantity(item , "dec")}>
                      <FiMinus />
                    </QtyBtn>
                    <QtyValue>{item.quantity}</QtyValue>
                    <QtyBtn onClick={() => updateQuantity(item, "inc")}>
                      <FiPlus />
                    </QtyBtn>
                  </QuantityControl>

                  <ItemPrice>
                    ₹{((item.sale_price || item.price) * item.quantity).toLocaleString()}
                  </ItemPrice>

                  <ActionButtons>
                    <ActionBtn className="quick-buy" title="Buy Now">
                      <FiZap />
                    </ActionBtn>
                    <ActionBtn className="delete" onClick={() => deleteProductFormCart(item)} title="Remove">
                      <FiTrash2 />
                    </ActionBtn>
                  </ActionButtons>
                </ItemCard>
              ))}
            </Section>
  )
}
