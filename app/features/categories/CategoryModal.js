"use client";

// CategoryModal.js
//
// A "controlled" modal: open/close are driven by props from the parent.
// This is the ONE modal that handles both Add and Edit — it just receives
// different `category` props (null for add, object for edit).

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import styled, { keyframes } from "styled-components";
import FormAddCategory from "./FormAddCategory";

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeIn  = keyframes`from{opacity:0}to{opacity:1}`;
const fadeOut = keyframes`from{opacity:1}to{opacity:0}`;
const slideUp   = keyframes`
  from{opacity:0;transform:translateY(24px) scale(0.97)}
  to  {opacity:1;transform:translateY(0)    scale(1)   }`;
const slideDown = keyframes`
  from{opacity:1;transform:translateY(0)    scale(1)   }
  to  {opacity:0;transform:translateY(24px) scale(0.97)}`;

// ─── Styled ───────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.48);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1000;
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.22s ease forwards;
`;

const Dialog = styled.div`
  position: relative;
  width: min(90vw, 68rem);
  max-height: 90vh;
  overflow-y: auto;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 3.2rem;
  box-shadow: var(--shadow-lg);
  animation: ${({ $closing }) => ($closing ? slideDown : slideUp)} 0.26s
    cubic-bezier(0.4, 0, 0.2, 1) forwards;

  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 100px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  color: var(--color-grey-500);

  svg { font-size: 2.4rem; }

  &:hover {
    background: var(--color-grey-100);
    color: var(--color-danger);
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-grey-900);
  margin-bottom: 2.4rem;
  padding-right: 4rem;
`;

// ─── Component ───────────────────────────────────────────────────────────────

export default function CategoryModal({ isOpen, category, onClose }) {

  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const ANIM_MS = 270;


  useEffect(() => { setMounted(true); }, []);

  // Sync external isOpen → local animation states
  useEffect(() => {
    if (isOpen) {
      setClosing(false);
      setVisible(true);
    } else if (visible) {
      setClosing(true);
      const t = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ESC key
  useEffect(() => {
    if (!visible) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible, onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  if (!mounted || !visible) return null;

  const isEditing = Boolean(category?.id);

  return createPortal(
    <Overlay $closing={closing} onClick={onClose}>
      <Dialog
        $closing={closing}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? "Edit category" : "Add category"}
      >
        <CloseBtn onClick={onClose} aria-label="Close">
          <IoCloseOutline />
        </CloseBtn>

        <ModalTitle>
          {isEditing ? `Edit — ${category.name}` : "Add new category"}
        </ModalTitle>

        <FormAddCategory
          key={category?.id ?? "new"}
          category={category}
          onSuccess={onClose}
        />
      </Dialog>
    </Overlay>,
    document.body
  );
}