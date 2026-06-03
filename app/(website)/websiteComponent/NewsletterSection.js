'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMail } from 'react-icons/fi';

const NewsletterWrapper = styled.section`
  padding: 0 4rem 6rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 4rem;
  }
`;

const NewsletterCard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #0A1E36;
  border: 1px solid #f3f4f6;
  border-radius: 20px;
  padding: 5rem 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const IconCircle = styled.div`
  width: 7rem;
  height: 7rem;
  background-color: #eef2ff;
  color: #4f46e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #ddd;
  line-height: 1.6;
  max-width: 600px;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column; // في الموبايل الزرار ينزل تحت الإيميل
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 1.5rem 2rem;
  font-size: 1.4rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: #f8fafc;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }
`;

const SubmitButton = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 1.5rem 3rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا تضيف منطق الـ API عشان تبعت الإيميل (مثلاً لـ Supabase أو Mailchimp)
    console.log('Subscribed with:', email);
    setEmail('');
  };

  return (
    <NewsletterWrapper>
      <NewsletterCard>
        <IconCircle>
          <FiMail />
        </IconCircle>
        <Title>Never Miss an Exclusive Drop</Title>
        <Description>
          No spam, ever. Receive exclusive alerts, restock notifications, and get a 15% discount voucher just for joining.
        </Description>
        
        <FormContainer as="form" onSubmit={handleSubmit}>
          <EmailInput 
            type="email" 
            placeholder="Enter your personal email account" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton type="submit">Unlock 15% discount</SubmitButton>
        </FormContainer>
      </NewsletterCard>
    </NewsletterWrapper>
  );
}