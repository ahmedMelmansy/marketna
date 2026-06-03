"use client"
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";

const Card = styled(Link)`
  position: relative;
  background: white;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  text-decoration: none;

  transition: 0.25s ease;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 1.4rem;
  right: 1.4rem;
  z-index: 5;

  background: #4f46e5;
  color: white;

  font-size: 1rem;
  font-weight: 700;

  padding: 0.7rem 1rem;
  border-radius: 100px;

  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.25);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #f8fafc;
`;

const Content = styled.div`
  padding: 1.8rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.8rem;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const Stock = styled.div`
  font-size: 1.2rem;
  color: ${(props) => (props.$low ? "#dc2626" : "#16a34a")};
  font-weight: 600;
  margin-bottom: 1.2rem;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color:#4f46e5;
  span{
    font-size: 1.3rem;
    color:#d22;
    text-decoration: line-through;
  }
`;


const Actions = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;
  gap: 1rem;
`;

const IconButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
    color: #0f172a;
  }

  &:hover {
    transform: translateY(-3px);
    background: #4f46e5;
    border-color: #4f46e5;

    svg {
      color: white;
    }
  }`
export default function ProductCard({product}) {
   const priceAfterDiscount =
  product.price * (1 - product.discount_percentage / 100);
  const{toggleFavorite, isFavorite } = useContext(FavoriteContext)
  const favorite = isFavorite(product.id);
  const {addProductCart} = useContext(CartContext)
  
  const{user} = useAuth()
  
  function handleCheckUser(){
    if(!user){
      toast.error("you must be logged to do this operation")
    }
  }
    
   
  return (
            <Card
              key={product.id}
              href={`/products/${product.id}`}
            >
              {!!product.discount_percentage && (
                <DiscountBadge>
                  {product.discount_percentage}% OFF
                </DiscountBadge>
              )}

              <ImageWrapper>
                <Image
                  src={product.main_image}
                  alt={product.name}
                  fill
                  sizes="
                    (max-width: 520px) 100vw,
                    (max-width: 768px) 50vw,
                    (max-width: 1200px) 33vw,
                    25vw
                  "
                  style={{
                    objectFit: "contain",
                    padding: "1.5rem",
                  }}
                />
              </ImageWrapper>

                <Content>
                <div>
                    <ProductName>
                    {product.name}
                    </ProductName>

                    <Stock $low={product.stock < 10}>
                    {product.stock < 10
                        ? `Only ${product.stock} left`
                        : `${product.stock} in stock`}
                    </Stock>

                    <BottomRow>
                    <Price>
                      {  product.discount_percentage ?<> ${priceAfterDiscount} <span>${product.price}</span> </>:<>${priceAfterDiscount}</>}
                    </Price>
                    </BottomRow>
                </div>

                  <Actions>
                      <IconButton  onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(product);
                        }}>
                      <Heart
                        fill={favorite ? "#ef4444" : "none"}
                        color={favorite ? "#ef4444" : "currentColor"}
                      />                                   
                      </IconButton>
                      <IconButton
                       onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        {  user? 
                         addProductCart(product) :
                        handleCheckUser()
                        }
                        }}
                      >
                      <ShoppingCart />
                      </IconButton>
                  </Actions>
                </Content>
            </Card>
  )
}
