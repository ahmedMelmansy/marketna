"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import styled, { keyframes } from "styled-components";

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeIn  = keyframes`from{opacity:0}to{opacity:1}`;
const fadeOut = keyframes`from{opacity:1}to{opacity:0}`;
const slideUp = keyframes`
  from{opacity:0;transform:translateY(20px) scale(0.97)}
  to  {opacity:1;transform:translateY(0)    scale(1)   }`;
const slideDown = keyframes`
  from{opacity:1;transform:translateY(0)    scale(1)   }
  to  {opacity:0;transform:translateY(20px) scale(0.97)}`;

// ─── Styled ───────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1000;
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.22s ease forwards;
`;

const StyledModal = styled.div`
  position: relative;
  width: min(90% , 1100px);       
  max-width: 1300px;            
  max-height: 94vh;
  overflow-y: auto;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg, 16px);
  padding: 3rem;
  box-shadow: var(--shadow-lg);
  animation: ${({ $closing }) => ($closing ? slideDown : slideUp)} 0.26s
    cubic-bezier(0.4, 0, 0.2, 1) forwards;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 100px;
  }

  @media (max-width: 768px) {
    width: 96%;
    padding: 2rem 1.5rem;
  }
`;
const CloseButton = styled.button`
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
  svg { font-size: 2.2rem; }
  &:hover {
    background: var(--color-grey-100);
    color: var(--color-danger, #ef4444);
  }
`;

// ─── Context ──────────────────────────────────────────────────────────────────

const ModalContext = createContext();


export default function Modal({ children }) {
  const [openName, setOpenName]     = useState("");
  const [closing, setClosing]       = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [windowContent, setWindowContent] = useState(null);
  const ANIM_MS = 260;

  useEffect(() => { setMounted(true); }, []);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setOpenName("");
      setClosing(false);
      setWindowContent(null);
    }, ANIM_MS);
  };

  const open = (name) => {
    setClosing(false);
    setOpenName(name);
  };

  // ESC key
  useEffect(() => {
    if (!openName) return;
    const handler = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openName]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = openName ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openName]);

  return (
    <ModalContext.Provider value={{ openName, open, close, setWindowContent }}>
      {/* ✅ children مرة واحدة بس — بس الـ Open triggers */}
      {children}

      {/* ✅ Portal بيعرض الـ windowContent بس مش كل الـ children */}
      {mounted && (openName || closing) &&
        createPortal(
          <Overlay $closing={closing} onClick={close}>
            <StyledModal
              $closing={closing}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <CloseButton onClick={close}>
                <IoMdClose />
              </CloseButton>
              {windowContent}
            </StyledModal>
          </Overlay>,
          document.body
        )}
    </ModalContext.Provider>
  );
}

// ─── Open ─────────────────────────────────────────────────────────────────────

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation();
      open(opens);
    },
  });
}

// ─── Window ───────────────────────────────────────────────────────────────────
//
// Window مش بترجع JSX — بس بتسجّل الـ content في الـ context
// عشان الـ portal في Modal يعرضه.
// ده بيحل مشكلة "الـ children بتتعرض مرتين".

function Window({ children, name }) {
  const { openName, setWindowContent } = useContext(ModalContext);

  useEffect(() => {
    if (openName === name) {
      setWindowContent(children);
    }
  }, [openName, name, children]);

  return null;
}

Modal.Open   = Open;
Modal.Window = Window;