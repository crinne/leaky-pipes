import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import UIButton from "../components/UIButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin-top: 40px;
`;

const ScoreContainer = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  width: 40rem;
`;

const ScoreItem = styled.div`
  display: flex;
  font-family: "Geo", sans-serif;
  font-size: ${(props) => props.theme.fontSizes[4]};
  color: ${(props) => props.theme.colors.green};
  justify-content: flex-start;
`;

const Place = styled.div`
  margin-right: 5px;
  margin-left: 5px;
`;
const Name = styled.div`
  flex-grow: 1;
`;
const Score = styled.div`
  margin-right: 5px;
`;

const HighScoresPage = () => {
  const history = useHistory();

  return (
    <Container>
      <Logo>
        High <br />
        scores
      </Logo>
      <ScoreContainer>
        <ScoreItem>
          <Place>1.</Place>
          <Name>John Doe</Name>
          <Score>432</Score>
        </ScoreItem>
        <ScoreItem>
          <Place>2.</Place>
          <Name>John Smith</Name>
          <Score>422</Score>
        </ScoreItem>
      </ScoreContainer>

      <UIButton
        left={true}
        small={true}
        text="Back"
        onClick={() => history.push("/")}
      />
    </Container>
  );
};

export default HighScoresPage;
