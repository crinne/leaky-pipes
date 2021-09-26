import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import UIButton from "../components/UIButton";
import Modal from "../components/Modal";

import Game from "../game/game";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const LevelSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const CanvasWrapper = styled.div`
  /* margin-top: 50px; */
  background-color: rosybrown;
  position: relative;
  justify-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 80vh;
  max-width: 80vw;
  overflow-y: scroll;
  overflow-x: scroll;
  margin-bottom: 20px;
  gap: 20px;

`;

const VerifyButton = styled.button`
  display: flex;
  font-size: ${props => props.theme.fontSizes[4]} ;
  color: ${props => props.theme.colors.green};
  justify-content: flex-start;
  user-select: none;

  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: "Geo", sans-serif;
  font-size: ${props => props.theme.fontSizes[6]} ;

  

  width: 15rem;
  height: 5rem;

  background: rgb(10, 20, 0);
  border: 0.2rem solid ${props => props.theme.colors.greenlight};


  border-radius: 12px;

  &:hover {
    color: rgb(151, 151, 1);
  }
`;

const GamePage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const history = useHistory();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && level) {
      new Game(level, canvasRef.current);
      canvasRef.current.addEventListener("game-result", handleVerifyEvent);
    }
  }, [level]);

  // a handler in the constructor.
  const handleVerifyEvent = (event: any) => {
    setModalMessage(event.detail.message);
    setShowModal(true);
  };

  const handleClick = (level: number) => {
    setGameStarted(true);
    setLevel(level);
  };

  const handleVerifyClick = () => {
    const event = new CustomEvent("verify");
    if (canvasRef.current) {
      canvasRef.current.dispatchEvent(event);
    }
  };

  return (
    <>
      {showModal ? (
        <Modal message={modalMessage} onClick={() => setShowModal(false)} />
      ) : null}

      <Container>
        {gameStarted ? (
          <GameWrapper>
            <VerifyButton onClick={handleVerifyClick}>Verify</VerifyButton>
            <CanvasWrapper id="leaky-pipes-game">
              <canvas ref={canvasRef} width="6000" height="60s00" />
            </CanvasWrapper>
          </GameWrapper>
        ) : (
          <LevelSelector>
            <Header>
              <Logo>Select level</Logo>
            </Header>
            <UIButton text="Level 1" onClick={() => handleClick(1)} />
            <UIButton text="Level 2" onClick={() => handleClick(2)} />
            <UIButton text="Level 3" onClick={() => handleClick(3)} />
            <UIButton text="Level 4" onClick={() => handleClick(4)} />
            <UIButton disabled text="Locked" onClick={() => handleClick(5)} />
            <UIButton disabled text="Locked" onClick={() => handleClick(6)} />
          </LevelSelector>
        )}
        <UIButton text="Exit" onClick={() => history.push("/")} />
      </Container>
    </>
  );
};
export default GamePage;
