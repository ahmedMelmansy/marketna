'use client';

import { useState } from 'react';
import styled from 'styled-components';
import DetailsSection from './DetailsSection';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import Empty from '../../websiteComponent/Empty';

const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 3rem auto;
  padding: 4rem 4rem;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  gap: 5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MainImageWrapper = styled.div`
  width: 60%;
  aspect-ratio: 1/1;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background-color: #f8fafc;
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
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

const Thumb = styled.div`
  width: 80px;
  height: 80px;
  min-width: 80px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#4f46e5' : 'transparent'};
  transition: all 0.2s ease;
  background-color: #f8fafc;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    border-color: ${props => props.active ? '#4f46e5' : '#e2e8f0'};
  }
`;



export default function ProductDetails({ product ,product_images }) {
  const product_images_details = [product.main_image, ...(product_images || [])];
  const [selectedImage, setSelectedImage] = useState(product_images_details[0]);
  const [quantity, setQuantity] = useState(1);
  const{user} = useAuth()
 
  if(!user) return <Empty resourceName="you must be logged in" />
 
  return (
    <PageWrapper>
      <ProductContainer>
        <ImageSection>
          <MainImageWrapper>
            <Image fill src={selectedImage} alt={product.name} />
          </MainImageWrapper>
          <Thumbnails>
            {product_images.map((img, index) => (
              <Thumb 
                key={index} 
                $active={selectedImage === img} 
                onClick={() => setSelectedImage(img)}
              >
                <Image fill src={img} alt={`thumbnail ${index}`} />
              </Thumb>
            ))}
          </Thumbnails>
        </ImageSection>
        <DetailsSection product={product}  quantity={quantity} setQuantity={setQuantity}/>
      </ProductContainer>

      
    </PageWrapper>
  );
}