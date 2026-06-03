"use client";

import ListMainNav from "../../ui/ListMainNav";
import { MdOutlineDashboard } from "react-icons/md";
import { FaBoxOpen, FaShoppingCart, FaUserTie } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { HiUsers } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import styled from "styled-components";
import Logo from "../../ui/Logo";



const Container = styled.aside`
  background-color: var(--color-brand-100);
  border-right: 1px solid var(--color-grey-300);

  position: sticky;
  top: 0;
  height: 100vh;

  display: flex;
  flex-direction: column;

  padding: 2rem 0;

  /* تمنع الكونتينر نفسه من الـ overflow */
  overflow: hidden;
`;

const TopSection = styled.div`
  flex-shrink: 0;
  margin: 2rem 0;
`;

const NavScrollArea = styled.div`
  /* ← الجزء اللي بيعمل scroll لو اللينكات اتكتروا */
  flex: 1;
  overflow-y: auto;
  padding: 1.6rem 0;

  /* خفي الـ scrollbar بس خليه شغال */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const StyledNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding: 0 1.6rem;
`;

const BottomSection = styled.div`
  flex-shrink: 0;
  padding: 1.6rem;
  border-top: 1px solid var(--color-grey-300);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export default function MainNav() {
  return (
    <Container>
      <TopSection>
        <Logo />
      </TopSection>

      <NavScrollArea>
        <StyledNav>
          <ListMainNav to="/dashboard"            title="dashboard"  icon={<MdOutlineDashboard />} />
          <ListMainNav to="/dashboard/products"   title="products"   icon={<FaBoxOpen />} />
          <ListMainNav to="/dashboard/categories" title="categories" icon={<BiSolidCategoryAlt />} />
          <ListMainNav to="/dashboard/profiles"  title="profiles"  icon={<HiUsers />} />
          <ListMainNav to="/dashboard/orders"     title="orders"     icon={<FaShoppingCart />} />
        </StyledNav>
      </NavScrollArea>

      <BottomSection>
        <ListMainNav to="/dashboard/settings" title="settings" icon={<IoSettingsSharp />} />
        <ListMainNav to="/logout"             title="logout"   icon={<IoIosLogOut />} />
      </BottomSection>
    </Container>
  );
}