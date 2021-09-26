import React from "react";

import styled from "styled-components";
import Logo from "./Logo";

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
`;

interface Props {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  message: string;
}
const Modal = ({ onClick, message }: Props) => {
  return (
    <Container onClick={onClick}>
      <Logo>{message}</Logo>
    </Container>
  );
};

export default Modal;
