import { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutsideClick from "../../../hooks/useOutsideClick";
import ModalPortal from "./ModalPotal";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
  onClose,
  children,
  modalWidth = "30rem",
  modalHeight = "20rem",
  top = "50%",
  bottom,
  left = "50%",
  right,
  translate = "-50%, -50%",
  isCloseBtn,
  radius = "15px",
}) => {
  const modalRef = useRef(null);
  const closeModalHander = () => {
    onClose?.();
  };
  useOutsideClick(modalRef, closeModalHander);

  useEffect(() => {
    const body = document.querySelector("body");
    const defaultStyle = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = defaultStyle;
    };
  }, []);

  return (
    <ModalPortal>
      <StModalOverlay>
        <StModalWrapper
          ref={modalRef}
          modalWidth={modalWidth}
          modalHeight={modalHeight}
          top={top}
          bottom={bottom}
          right={right}
          left={left}
          translate={translate}
          radius={radius}
        >
          {isCloseBtn ? <AiOutlineClose className="close-icon" onClick={closeModalHander} /> : null}
          {children}
        </StModalWrapper>
      </StModalOverlay>
    </ModalPortal>
  );
};

const StModalOverlay = styled.div`
  width: 36rem;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 50;
`;

const StModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: ${(props) => props.modalWidth};
  height: ${(props) => props.modalHeight};
  border-radius: ${(props) => props.radius};
  background-color: white;
  overflow: hidden;
  transform: translate(${(props) => props.translate});
  .close-icon {
    position: absolute;
    top: 2.2rem;
    right: 2.2rem;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export default Modal;
