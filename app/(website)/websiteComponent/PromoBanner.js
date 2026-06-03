'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';

const PromoWrapper = styled.section`
  padding: 0 4rem 6rem; // مساحة من فوق صفر عشان يلبس للجزء اللي فوقيه، وتحت 6rem

  @media (max-width: 768px) {
    padding: 0 1.5rem 4rem;
  }
`;

const PromoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #4f46e5; /* اللون البنفسجي الأساسي */
  border-radius: 20px;
  padding: 4rem 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  overflow: hidden;
  position: relative;

  // إضافة شكل دائري خفيف في الخلفية عشان يدي عمق (زي التصميم المودرن)
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    flex-direction: column; // في الموبايل النص ينزل تحت والزرار يحل تحتيه
    text-align: center;
    padding: 3rem 2rem;
    gap: 2.5rem;
  }
`;

const TextContent = styled.div`
  color: #ffffff;
  z-index: 1;
  flex: 1;
`;

const TopTag = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #e0e7ff;
  text-transform: uppercase;
  display: block;
  margin-bottom: 1rem;
`;

const MainTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #c7d2fe;
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 1.4rem;
  }
`;

const ClaimButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background-color: #ffffff;
  color: #4f46e5;
  padding: 1.5rem 3rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  white-space: nowrap;
  z-index: 1;

  &:hover {
    background-color: #f8fafc;
    transform: translateX(5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export default function PromoBanner() {
  return (
    <PromoWrapper>
      <PromoContainer>
        <TextContent>
          <TopTag>Exclusive Summer Deal</TopTag>
          <MainTitle>Get 20% off plus free express delivery</MainTitle>
          <Subtitle>Stock is limited! Use the exclusive checkout code MARKETNA20 on any purchase items for immediate discounts.</Subtitle>
        </TextContent>
        <ClaimButton href='/'>
          Claim Promo Code <FiArrowRight />
        </ClaimButton>
      </PromoContainer>
    </PromoWrapper>
  );
}