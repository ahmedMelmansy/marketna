"use client";

import { Boxes, DollarSign, Package, TrendingUp, X, Tag, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useProductImages } from "./useProductImages";

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeSlide = keyframes`
  from { opacity: 0; transform: scale(1.03); }
  to   { opacity: 1; transform: scale(1); }
`;

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  width: min(1200px, 100%);
  background: var(--color-grey-0, #fff);
  border-radius: 24px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 1fr;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    max-height: 90vh;
    overflow-y: auto;
  }
`;

// ─── LEFT — Gallery ───────────────────────────────────────────────────────────

const GalleryPanel = styled.div`
  padding: 2.4rem;
  background: var(--color-grey-50, #f9fafb);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-height: 420px;
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
`;

const FadeImage = styled(Image)`
  animation: ${fadeSlide} 0.3s ease forwards;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Thumb = styled.button`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;

  ${({ $active }) =>
    $active
      ? css`
          outline: 2.5px solid var(--color-brand-500, #6366f1);
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        `
      : css`
          outline: 1.5px solid var(--color-grey-200, #e5e7eb);
        `}

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

// ─── Loading skeleton ─────────────────────────────────────────────────────────

const SkeletonBox = styled.div`
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    var(--color-grey-100) 25%,
    var(--color-grey-200) 50%,
    var(--color-grey-100) 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

// ─── RIGHT — Content ──────────────────────────────────────────────────────────

const ContentPanel = styled.div`
  padding: 2.8rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  overflow-y: auto;
  max-height: 600px;

  @media (max-width: 860px) {
    max-height: unset;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const Badges = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const SKUBadge = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: var(--color-brand-600, #4f46e5);
  background: var(--color-brand-50, #eef2ff);
  padding: 0.35rem 1rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  svg { width: 13px; height: 13px; }
`;

const StatusBadge = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  padding: 0.35rem 1rem;
  border-radius: 100px;
  background: ${({ $active }) => ($active ? "#dcfce7" : "#fee2e2")};
  color: ${({ $active }) => ($active ? "#15803d" : "#dc2626")};
`;

const ProductName = styled.h2`
  font-size: clamp(2rem, 3.5vw, 2.2rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--color-grey-900, #111827);
  margin: 0;
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-grey-500, #6b7280);
  font-weight: 500;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-100, #f3f4f6);
  margin: 0;
`;

const DescBox = styled.div`
  padding: 1.6rem;
  background: var(--color-grey-50, #f9fafb);
  border-radius: 16px;
  border: 1px solid var(--color-grey-100, #f3f4f6);

  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-grey-700, #374151);
    margin-bottom: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    font-size: 1.4rem;
    color: var(--color-grey-600, #4b5563);
    line-height: 1.75;
    margin: 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: var(--color-grey-50, #f9fafb);
  border: 1px solid var(--color-grey-100, #f3f4f6);
  border-radius: 16px;
  padding: 1.4rem 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: var(--color-brand-50, #eef2ff);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 18px;
      height: 18px;
      color: var(--color-brand-600, #4f46e5);
    }
  }

  h5 {
    margin: 0 0 0.3rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-grey-500, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  span {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-grey-900, #111827);
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.3rem !important;
  font-weight: 800 !important;
  color: var(--color-brand-600, #4f46e5) !important;
`;

const OldPrice = styled.span`
  font-size: 1.2rem !important;
  font-weight: 500 !important;
  color: var(--color-grey-400, #9ca3af) !important;
  text-decoration: line-through;
`;

const EmptyGallery = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 14px;
  background: var(--color-grey-100, #f3f4f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--color-grey-400);
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductView({ product, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  // ✅ FIX 1: مش بنعمل Number() — بنبعت الـ id زي ما هو
  const { data: dbImages = [], isLoading: imagesLoading } = useProductImages(product?.id);
console.log(dbImages )

  if (!product) return null;

  // ✅ FIX 2: بنبني الـ gallery من الـ DB images الحقيقية
  // لو مفيش gallery images، بنعرض الـ main_image بس
  const galleryImages = [
    product.main_image,
    ...dbImages.map((img) => img.image_url).filter(Boolean),
  ].filter(Boolean); // شيل أي null أو undefined

  // حساب السعر بعد الخصم
  const discount = product.discount_percentage || 0;
  const salePrice = discount > 0
    ? (product.price * (1 - discount / 100)).toFixed(2)
    : null;
  return (
    <Wrapper>
      {/* ── LEFT: Gallery ── */}
      <GalleryPanel>
        <MainImageWrapper>
          {galleryImages[activeImage] ? (
            // key بيعمل re-mount عشان animation تشتغل كل مرة
            <FadeImage
              key={activeImage}
              src={galleryImages[activeImage]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 55vw"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <SkeletonBox style={{ width: "100%", height: "100%" }} />
          )}
        </MainImageWrapper>

        {/* Thumbnails — بتظهر بس لو في أكتر من صورة */}
        {galleryImages.length > 1 && (
          <Thumbnails>
            {galleryImages.map((img, index) => (
              <Thumb
                key={index}
                $active={activeImage === index}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={img}
                  alt={`view-${index}`}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                />
              </Thumb>
            ))}
          </Thumbnails>
        )}

        {/* لو الصور لسه بتتحمل */}
        {imagesLoading && galleryImages.length <= 1 && (
          <Thumbnails>
            {[1, 2, 3].map((i) => (
              <SkeletonBox key={i} style={{ width: 80, height: 80 }} />
            ))}
          </Thumbnails>
        )}
      </GalleryPanel>

      {/* ── RIGHT: Content ── */}
      <ContentPanel>
        <TopRow>
          <Badges>
            <SKUBadge>
              <Tag /> {product.sku || "—"}
            </SKUBadge>
            <StatusBadge $active={product.is_active}>
              {product.is_active ? "Active" : "Hidden"}
            </StatusBadge>
          </Badges>
        </TopRow>

        <div>
          <ProductName>{product.name}</ProductName>
          <BrandRow>
            <Star size={14} />
            {product.brand || "Unknown brand"}
          </BrandRow>
        </div>

        <Divider />

        <DescBox>
          <h4>Description</h4>
          <p>{product.description || "No description provided."}</p>
        </DescBox>

        <StatsGrid>
          {/* Price */}
          <StatCard>
            <div className="icon"><DollarSign /></div>
            <div>
              <h5>Price</h5>
              {salePrice ? (
                <PriceRow>
                  <CurrentPrice>{salePrice} EGP</CurrentPrice>
                  <OldPrice>{product.price} EGP</OldPrice>
                </PriceRow>
              ) : (
                <span>{product.price} EGP</span>
              )}
            </div>
          </StatCard>

          {/* Discount */}
          <StatCard>
            <div className="icon"><TrendingUp /></div>
            <div>
              <h5>Discount</h5>
              <span>{discount > 0 ? `${discount}%` : "—"}</span>
            </div>
          </StatCard>

          {/* Stock */}
          <StatCard>
            <div className="icon"><Boxes /></div>
            <div>
              <h5>Stock</h5>
              <span
                style={{
                  color: product.stock < 10
                    ? "var(--color-danger, #ef4444)"
                    : "inherit",
                }}
              >
                {product.stock}
                {product.stock < 10 && product.stock > 0 && " ⚠️"}
                {product.stock === 0 && " (Out)"}
              </span>
            </div>
          </StatCard>

          {/* Sales */}
          <StatCard>
            <div className="icon"><Package /></div>
            <div>
              <h5>Sales</h5>
              <span>{product.review_count ?? 0}</span>
            </div>
          </StatCard>
        </StatsGrid>
      </ContentPanel>
    </Wrapper>
  );
}