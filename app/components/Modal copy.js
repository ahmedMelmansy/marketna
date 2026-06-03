
"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { IoCloseOutline } from "react-icons/io5";

import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;

  inset: 0;

  background-color: rgba(0, 0, 0, 0.45);

  backdrop-filter: blur(4px);

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 2rem;

  z-index: 1000;

  animation: overlayAnimation 0.2s ease;

  @keyframes overlayAnimation {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const StyledModal = styled.div`
  position: relative;

  width: min(90%, 70rem);

  max-height: 90vh;

  overflow-y: auto;

  background-color: var(--color-grey-0);

  border-radius: var(--border-radius-lg);

  padding: 3rem;

  box-shadow: var(--shadow-lg);

  will-change: transform;

  animation: modalAnimation 0.3s ease;

  &::-webkit-scrollbar {
    width: 6px;
  }

  @keyframes modalAnimation {
    from {
      opacity: 0;
      transform: translateY(25px) scale(0.98);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;

  top: 1.2rem;
  right: 1.2rem;

  width: 4rem;
  height: 4rem;

  border: none;

  border-radius: 50%;

  background-color: transparent;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  transition: 0.2s;

  svg {
    font-size: 2.8rem;
    color: var(--color-grey-500);
  }

  &:hover {
    background-color: var(--color-grey-100);

    svg {
      color: var(--color-danger);
    }
  }
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  const open = setOpenName;

  return (
    <ModalContext.Provider
      value={{
        openName,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }) {
  const { openName, close } =
    useContext(ModalContext);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") close();
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handleEscape
      );
  }, []);

  if (name !== openName) return null;

  return (
    <Overlay onClick={close}>
      <StyledModal
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <CloseButton onClick={close}>
          <IoCloseOutline />
        </CloseButton>

        {children}
      </StyledModal>
    </Overlay>
  );
}

Modal.Open = Open;

Modal.Window = Window;

