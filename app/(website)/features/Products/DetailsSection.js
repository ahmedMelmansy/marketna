"use client"
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import styled from "styled-components";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const Wrapper= styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BrandTag = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #4f46e5;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 2.8rem;
  font-weight: 800;
  color: #111827;
`;

const OldPrice = styled.span`
  font-size: 1.6rem;
  color: #9ca3af;
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background-color: #fee2e2;
  color: #ef4444;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 1.2rem;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #6b7280;
  line-height: 1.7;
`;

const StockStatus = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.inStock ? '#10b981' : '#ef4444'};
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid #f3f4f6;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const QtyLabel = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: #374151;
`;

const QtyControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const QtyBtn = styled.button`
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  cursor: pointer;
  color: #4f46e5;
  transition: background 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
  
  &:disabled {
    color: #d1d5db;
    cursor: not-allowed;
  }
`;

const QtyValue = styled.span`
  padding: 0 1.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: #111827;
  min-width: 50px;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddToCartBtn = styled.button`
  flex: 1;
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

const FavBtn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2.2rem;
  color: ${props => props.active ? '#ef4444' : '#9ca3af'};
  transition: all 0.2s;

  &:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
`;

export default  function DetailsSection({product,quantity,setQuantity}) {
  const finalPrice = product.sale_price || product.price;
  const hasDiscount = product.sale_price && product.price > product.sale_price;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.sale_price) / product.price) * 100) : product.discount_percentage;
  const {toggleFavorite , isFavorite} =useContext(FavoriteContext);
  const{addProductCart} = useContext(CartContext)
  return (
        <Wrapper>
          <BrandTag>{product.brand}</BrandTag>
          <Title>{product.name}</Title>
          
          <PriceContainer>
            <CurrentPrice>₹{finalPrice?.toLocaleString()}</CurrentPrice>
            {hasDiscount && <OldPrice>₹{product.price?.toLocaleString()}</OldPrice>}
            {discountPercent > 0 && <DiscountBadge>{discountPercent}% OFF</DiscountBadge>}
          </PriceContainer>

          <StockStatus inStock={product.stock > 0}>
            {product.stock > 0 ? `In Stock` : 'Out of Stock'}
          </StockStatus>

          <Description>{product.description}</Description>

          <ControlsWrapper>
            <QuantitySelector>
              <QtyLabel>Quantity:</QtyLabel>
              <QtyControl>
                <QtyBtn onClick={() => setQuantity(prev => Math.max(1, prev - 1),)} disabled={quantity <= 1}>
                  <FiMinus />
                </QtyBtn>
                <QtyValue>{quantity}</QtyValue>
                <QtyBtn onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1),)} disabled={quantity >= product.stock}>
                  <FiPlus />
                </QtyBtn>
              </QtyControl>
            </QuantitySelector>

            <ActionButtons>
              <AddToCartBtn disabled={product.stock === 0} onClick={()=>addProductCart(product,quantity)}>
                <FiShoppingCart /> Add to Cart
              </AddToCartBtn>
              <FavBtn $active={isFavorite} onClick={()=>{toggleFavorite(product)}} >
                <FiHeart fill={isFavorite(product.id)? '#ef4444' : 'none'} />
              </FavBtn>
            </ActionButtons>
          </ControlsWrapper>
        </Wrapper>
  )
}


