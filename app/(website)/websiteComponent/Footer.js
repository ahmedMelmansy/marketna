'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FiLock, FiShield } from 'react-icons/fi';

// 1. الحاوية الرئيسية للفوتر
const FooterWrapper = styled.footer`  
  border-top: 1px solid var(--color-grey-100, #f3f4f6);
  padding: 6rem 3rem 2rem;
  color: #fff;
  background-color: var(--color-grey-900);
  @media (max-width: 968px) {
    padding: 4rem 2rem 2rem;
  }
`;

const FooterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // في الموبايل كل حاجة تنزل تحت بعض
    gap: 3rem;
    text-align: center;
  }
`;

// 2. القسم الخاص باللوجو والوصف
const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
`;

const LogoIcon = styled.div`
  background-color: #4f46e5;
  color: white;
  font-weight: 900;
  font-size: 3rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
`;

const LogoText = styled.span`
  font-size: 2rem;
  font-weight: 800;
  color: #4f46e5;
  letter-spacing: -0.5px;
`;

const BrandDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-grey-100, #6b7280);
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// 3. أعمدة الروابط
const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-grey-100, #111827);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FooterLink = styled(Link)`
  font-size: 1.4rem;
  color: var(--color-grey-600, #6b7280);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #4f46e5;
  }
`;

// 4. قسم حماية الدفع
const PaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const PaymentText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-grey-500, #6b7280);
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    margin-top: 0.2rem;
    color: #4f46e5;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// 5. الشريط السفلي (الكوبي رايت)
const BottomBar = styled.div`
  max-width: 1300px;
  margin: 4rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-100, #f3f4f6);
  display: flex;
  justify-content: space-between;
  align-items: center;


  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 1rem;
  color: var(--color-grey-400, #9ca3af);
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LegalLink = styled(Link)`
  font-size: 1rem;
  color: var(--color-grey-400, #9ca3af);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #4f46e5;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        
        {/* العمود الأول: اللوجو والوصف */}
        <BrandSection>
          <LogoContainer href="/">
            <LogoIcon>M</LogoIcon>
            <LogoText>Marketna</LogoText>
          </LogoContainer>
          <BrandDescription>
            Discover a seamless shopping experience with premium quality products and unbeatable prices.
          </BrandDescription>
        </BrandSection>

        {/* العمود الثاني: التنقل السريع */}
        <LinkColumn>
          <ColumnTitle>Quick Navigation</ColumnTitle>
          <FooterLink href="/">Marketplace Home</FooterLink>
          <FooterLink href="/premium">Examine Premium Inventory</FooterLink>
          <FooterLink href="/departments">Browse Departments List</FooterLink>
        </LinkColumn>

        {/* العمود الثالث: منطقة المشتري */}
        <LinkColumn>
          <ColumnTitle>Buyer Zone</ColumnTitle>
          <FooterLink href="/profile">My Profile Panel</FooterLink>
          <FooterLink href="/cart">Active Shopping Bag</FooterLink>
          <FooterLink href="/receipts">Track Receipts History</FooterLink>
        </LinkColumn>

        {/* العمود الرابع: حماية الدفع */}
        <PaymentSection>
          <ColumnTitle>Payment Safeguard</ColumnTitle>
          <PaymentText>
            <FiLock size={15} />
            Your payment details are fully encrypted and processed through secure channels.
          </PaymentText>
          <PaymentText>
            <FiShield size={15} />
            We guarantee buyer protection and refunds for unauthorized transactions.
          </PaymentText>
        </PaymentSection>

      </FooterContainer>

      {/* الشريط السفلي */}
      <BottomBar>
        <Copyright>© 2026 Marketna Corporation. All rights reserved.</Copyright>
        <LegalLinks>
          <LegalLink href="/certifications">Security Certifications</LegalLink>
          <LegalLink href="/terms">SLA Terms</LegalLink>
        </LegalLinks>
      </BottomBar>
    </FooterWrapper>
  );
}