import {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

import styled from "styled-components";
import { IoMdClose } from "react-icons/io";


const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background-color: var(--color-grey-0);

  border-radius: var(--border-radius-lg);

  box-shadow: var(--shadow-lg);

  padding: 3rem;

  /* width: min(60%); */
  width: fit-content;
  max-height: 90vh;

  overflow-y: auto;

  z-index: 1001;

  animation: modalShow 0.25s ease;

  @keyframes modalShow {
    from {
      opacity: 0;
      transform: translate(-50%, -55%);
    }

    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
    width: 92%;
  }
  width: 50%;
`;

const Overlay = styled.div`
  position: fixed;

  inset: 0;

  background-color: var(--backdrop-color);

  backdrop-filter: blur(4px);

  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;

  top: 1.4rem;
  right: 1.4rem;

  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.4rem;

  border-radius: 50%;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  svg {
    width: 2.2rem;
    height: 2.2rem;

    color: var(--color-grey-500);
  }
`;
const ModalBox = styled.div`
  background: var(--color-grey-0);
  border-radius: 20px;
  padding: 3rem;
  width: min(90%, 700px);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  z-index: 1001;
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

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <CloseButton onClick={close}>
          <IoMdClose />
        </CloseButton>

        <div>
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;