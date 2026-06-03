'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FiCopy, FiCheck } from 'react-icons/fi';

// 1. الغلاف الخارجي (الخلفية الداكنة)
const HeroWrapper = styled.section`
  background-color: #1e1b4b; /* درجة بنفسجي داكن فخمة */
  padding: 8rem 4rem;
  overflow: hidden;
  max-width: 1400px;
  margin: 2rem auto;
  border-radius: 20px;
  @media (max-width: 968px) {
    padding: 6rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
`;

const HeroContainer = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;

  @media (max-width: 768px) {
    flex-direction: column; /* في الموبايل النص بينزل تحت والصورة بتتشال */
    text-align: center;
    gap: 0;
  }
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  color: #ffffff;
  z-index: 2;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const TopTag = styled.span`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c4b5fd; /* بنفسجي فاتح */
  background: rgba(139, 92, 246, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  width: fit-content;
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;

  @media (max-width: 968px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #e2e8f0;
  line-height: 1.6;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }
`;

const ShopButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #4f46e5;
  color: white;
  padding: 1.5rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CouponBox = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px dashed #a5b4fc;
  color: #ffffff;
  padding: 1.2rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #ffffff;
  }

  svg {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

// 3. جزء الصورة (اليمين)
const ImageContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  /* إخفاء الصورة في الموبايل زي ما طلبت */
  @media (max-width: 768px) {
    display: none; 
  }
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  object-fit: cover;
`;

export default function HeroSection() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('MARKETNA20');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // يرجع زي ما كان بعد ثانيتين
  };

  return (
    <HeroWrapper>
      <HeroContainer>
        
        {/* الجزء اللي على الشمال (النصوص) */}
        <TextContent>
          <TopTag>Hot Summer Releases Online</TopTag>
          <MainTitle>The Next Era of Premium Retail</MainTitle>
          <Subtitle>
            Discover engineered gadgets and premium cosmetics crafted for the modern lifestyle. Elevate your everyday experience.
          </Subtitle>
          
          <ActionsContainer>
            <ShopButton href="/products">Shop the Catalog</ShopButton>
            <CouponBox onClick={handleCopyCode}>
              {isCopied ? (
                <>
                  <FiCheck /> Copied!
                </>
              ) : (
                <>
                  <FiCopy /> Copy Coupon Code: MARKETNA20
                </>
              )}
            </CouponBox>
          </ActionsContainer>
        </TextContent>

        {/* الجزء اللي على اليمين (الصورة) */}
        <ImageContent>
          <HeroImage 
            src="/hero.png" 
            alt="Premium Summer Collection" 
          />
        </ImageContent>

      </HeroContainer>
    </HeroWrapper>
  )
}