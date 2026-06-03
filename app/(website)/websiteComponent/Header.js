'use client';

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FiSearch, FiHeart, FiShoppingBag, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';
import { FavoriteContext } from '../contexts/FavoriteContext';
import { CartContext } from '../contexts/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 4rem;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-grey-800, #f3f4f6);
  font-family: inherit;
  gap: 2.4rem;

  @media (max-width: 968px) {
    padding: 1.5rem 2rem;
    gap: 1.6rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
    gap: 1rem;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  flex-shrink: 0;
`;

const LogoIcon = styled.div`
  background-color: #4f46e5;
  color: white;
  font-weight: 900;
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.6rem;
  }
`;

const LogoText = styled.span`
  font-size: 2.4rem;
  font-weight: 800;
  color: #4f46e5;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledNavLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 500;
  position: relative;
  color: var(--color-grey-600, #4b5563);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #4f46e5;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  max-width: 500px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 4rem 1rem 2rem;
  font-size: 1.4rem;
  background-color: var(--color-grey-50, #f8fafc);
  border: 1px solid var(--color-grey-200, #e2e8f0);
  border-radius: 100px;
  color: var(--color-grey-800, #1e293b);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background-color: #ffffff;
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1.6rem;
  color: var(--color-grey-400, #94a3b8);
  font-size: 1.8rem;
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-grey-700, #334155);
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: var(--color-grey-100, #f1f5f9);
    color: #4f46e5;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 2.4rem;
  background-color: var(--color-grey-200, #e2e8f0);

  @media (max-width: 768px) {
    display: none;
  }
`;

const SignInButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #4f46e5;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-grey-200, #e2e8f0);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 50;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileNavLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800, #1e293b);
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-100, #f3f4f6);
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    color: #4f46e5;
  }
`;

const MobileSignIn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1rem;
  padding: 1.2rem;
  background-color: #4f46e5;
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4338ca;
  }
`;

// skeleton بسيط لحد ما الـ auth يتحمل
const AvatarSkeleton = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e2e8f0;
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favoriteItems } = useContext(FavoriteContext);
  const { cartItems } = useContext(CartContext);
  const { user, loading, role } = useAuth();

  return (
    <Navbar>
      <LogoContainer href="/">
        <LogoIcon>M</LogoIcon>
        <LogoText>Marketna</LogoText>
      </LogoContainer>

      <NavLinks>
        <StyledNavLink href="/">Home</StyledNavLink>
        <StyledNavLink href="/products">Products</StyledNavLink>
        <StyledNavLink href="/categories">Categories</StyledNavLink>
      </NavLinks>

      <SearchContainer>
        <SearchInput type="text" placeholder="Search for products..." />
        <SearchIcon>
          <FiSearch />
        </SearchIcon>
      </SearchContainer>

      <ActionsContainer>

        {/* Favorites */}
        <StyledNavLink href="/favorite">
          <IconButton aria-label="Favorites">
            <FiHeart />
            {favoriteItems > 0 && <Badge>{favoriteItems}</Badge>}
          </IconButton>
        </StyledNavLink>

        {/* Cart */}
        <StyledNavLink href="/cart">
          <IconButton aria-label="Cart">
            <FiShoppingBag />
            {cartItems > 0 && <Badge>{cartItems}</Badge>}
          </IconButton>
        </StyledNavLink>

        <Divider />

        {/* Auth — بنستنى loading يخلص الأول */}
        {loading ? (
          <AvatarSkeleton />
        ) : user ? (
          <>
            <StyledNavLink href="/profile">
              <IconButton aria-label="Profile">
                <CgProfile />
              </IconButton>
            </StyledNavLink>

            {role === "admin" && (
              <StyledNavLink href="/dashboard">
                <IconButton aria-label="Dashboard">
                  <MdOutlineDashboard />
                </IconButton>
              </StyledNavLink>
            )}
          </>
        ) : (
          <SignInButton href="/login">
            Sign In <FiArrowRight />
          </SignInButton>
        )}

        {/* Mobile menu button */}
        <IconButton
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none' }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </IconButton>

      </ActionsContainer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <MobileMenu>
          <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="/products" onClick={() => setIsMenuOpen(false)}>Products</MobileNavLink>
          <MobileNavLink href="/categories" onClick={() => setIsMenuOpen(false)}>Categories</MobileNavLink>

          {loading ? (
            <AvatarSkeleton />
          ) : user ? (
            <>
              <MobileNavLink href="/profile" onClick={() => setIsMenuOpen(false)}>
                <CgProfile /> Profile
              </MobileNavLink>
              {role === "admin" && (
                <MobileNavLink href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <MdOutlineDashboard /> Dashboard
                </MobileNavLink>
              )}
            </>
          ) : (
            <MobileSignIn href="/login" onClick={() => setIsMenuOpen(false)}>
              Sign In <FiArrowRight />
            </MobileSignIn>
          )}
        </MobileMenu>
      )}
    </Navbar>
  );
}