import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import { useContext } from "react";

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  width: fit-content;
  border: 1px solid #f3f4f6;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: #e0e7ff;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 1rem;
  }
`;

const ImageWrapper = styled.div`
  width: 120px;
  position: relative;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f9fafb;
  flex-shrink: 0;
  border: 1px solid #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductBrand = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #4f46e5;
  text-transform: uppercase;
`;

const ProductName = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProductPrice = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  color: #111827;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: 1px solid transparent;
  cursor: pointer;
  color: #9ca3af;
  font-size: 2rem;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: #fef2f2;
    color: #ef4444;
    border-color: #fecaca;
  }
`;
export default function FavoriteCard({product}) {
const { toggleFavorite } = useContext(FavoriteContext);
    
  return (
            
    <Card >
        <ImageWrapper>
        <Image src={product.main_image} fill alt={product.name} />
        </ImageWrapper>
        
        <ProductInfo>
        {product.brand && <ProductBrand>{product.brand}</ProductBrand>}
        <ProductName>{product.name}</ProductName>
        <ProductPrice>₹{(product.sale_price || product.price)?.toLocaleString()}</ProductPrice>
        </ProductInfo>

        <RemoveButton onClick={() => toggleFavorite(product)}>
        <FiTrash2 />
        </RemoveButton>
    </Card>
  )
}
