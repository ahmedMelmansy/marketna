'use client';

import React from 'react';
import styled from 'styled-components';
import { FiTruck, FiShield, FiHeadphones, FiRefreshCw } from 'react-icons/fi';

// 1. الغلاف الخارجي
const FeaturesWrapper = styled.section`
  background-color: #f8fafc; /* لون رمادي فاتح جداً عشان الكروت البيضاء تبرز */
  padding: 6rem 4rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

// 2. الـ Grid اللي بيرتب الكروت
const FeaturesGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  // في الموبايل والتابلت: 2 كرت جمب بعض
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  // في اللاب توب (شاشات أكبر من 768px): 4 كروت جمب بعض
  @media (min-width: 769px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// 3. تصميم الكرت الواحد
const FeatureCard = styled.div`
  background-color: #ffffff;
  padding: 3rem 2rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(79, 70, 229, 0.08);
    border-color: #e0e7ff;
  }
`;

// 4. دايرة الأيقونة
const IconCircle = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: #eef2ff; /* لون بنفسجي شفاف خفيف */
  color: #4f46e5; /* لون البنفسجي الأساسي بتاع البراند */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem; /* حجم الأيقونة */
`;

// 5. العنوان
const CardTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
`;

// 6. الوصف
const CardDesc = styled.p`
  font-size: 1.4rem;
  color: #6b7280;
  line-height: 1.5;
`;

export default function FeaturesSection() {
  return (
    <FeaturesWrapper>
      <FeaturesGrid>
        
        {/* الكرت الأول: الشحن */}
        <FeatureCard>
          <IconCircle>
            <FiTruck />
          </IconCircle>
          <CardTitle>Complimentary shipping</CardTitle>
          <CardDesc>On luxury orders above $100</CardDesc>
        </FeatureCard>

        {/* الكرت التاني: الدفع الآمن */}
        <FeatureCard>
          <IconCircle>
            <FiShield />
          </IconCircle>
          <CardTitle>Encrypted Payments</CardTitle>
          <CardDesc>Secure local & card processor</CardDesc>
        </FeatureCard>

        {/* الكرت التالت: الدعم */}
        <FeatureCard>
          <IconCircle>
            <FiHeadphones />
          </IconCircle>
          <CardTitle>Dedicated Help 24/7</CardTitle>
          <CardDesc>Real humans, active callbacks</CardDesc>
        </FeatureCard>

        {/* الكرت الرابع: الاسترجاع */}
        <FeatureCard>
          <IconCircle>
            <FiRefreshCw />
          </IconCircle>
          <CardTitle>Easy returns</CardTitle>
          <CardDesc>Simple 14-day hassle-free returns</CardDesc>
        </FeatureCard>

      </FeaturesGrid>
    </FeaturesWrapper>
  );
}