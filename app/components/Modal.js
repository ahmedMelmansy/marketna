"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import styled, { keyframes } from "styled-components";

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const slideDown = keyframes`
  from { opacity: 1; transform: translateY(0)    scale(1);    }
  to   { opacity: 0; transform: translateY(20px) scale(0.97); }
`;

// ─── Styled components ───────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1000;
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.22s ease
    forwards;
`;

const StyledModal = styled.div`
  position: relative;
  width: min(90vw, 68rem);
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 3.2rem;
  box-shadow: var(--shadow-lg);
  animation: ${({ $closing }) => ($closing ? slideDown : slideUp)} 0.25s
    cubic-bezier(0.4, 0, 0.2, 1) forwards;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 100px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 3.6rem;
  height: 3.6rem;
  border: none;
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--color-grey-500);

  svg {
    font-size: 2.4rem;
  }

  &:hover {
    background: var(--color-grey-100);
    color: var(--color-danger);
  }
`;

// ─── Context ─────────────────────────────────────────────────────────────────

const ModalContext = createContext(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider>");
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────
//
// WHY A SINGLE PROVIDER AT THE TOP?
//   Your original code put <Modal> inside every <CardStyle>.
//   That means N cards = N modal states = N portals fighting each other.
//   One provider at the page (or layout) level owns a single piece of state,
//   and every card just calls openModal(). No race conditions, no flicker.

export function ModalProvider({ children }) {
  const [content, setContent] = useState(null);   // what to render inside the modal
  const [closing, setClosing] = useState(false);  // drives exit animation
  const [mounted, setMounted] = useState(false);  // SSR guard

  // WHY mounted?
  // styled-components + Next.js App Router: the server renders HTML without
  // window/document. createPortal needs document.body, which only exists on
  // the client. We defer the portal until after hydration to avoid the
  // "cannot use createPortal on server" hydration mismatch.
  useEffect(() => { setMounted(true); }, []);

  const closeModal = useCallback(() => {
    setClosing(true);
    // Wait for exit animation before unmounting
    setTimeout(() => {
      setContent(null);
      setClosing(false);
    }, 260);
  }, []);

  const openModal = useCallback((node) => {
    setClosing(false);
    setContent(node);
  }, []);

  // ESC key — attached once at provider level, not per-window
  useEffect(() => {
    if (!content) return;
    const handler = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [content, closeModal]);

  // Body scroll lock while open
  useEffect(() => {
    document.body.style.overflow = content ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [content]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* Portal only renders client-side after hydration */}
      {mounted &&
        content &&
        createPortal(
          <Overlay $closing={closing} onClick={closeModal}>
            <StyledModal
              $closing={closing}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <CloseButton onClick={closeModal} aria-label="Close modal">
                <IoCloseOutline />
              </CloseButton>
              {content}
            </StyledModal>
          </Overlay>,
          document.body
        )}
    </ModalContext.Provider>
  );
}