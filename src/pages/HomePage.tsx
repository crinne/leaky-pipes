import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import UIButton from "../components/UIButton";

const Wrapper = styled.div`
  justify-self: flex-end;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menu = styled.ul`
  margin-top: 8rem;
  text-align: center;
  list-style: none;
`;

const MenuItem = styled.li`
  margin: 2rem 0;
`;

const HomeScreen = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <Logo>
        Leaky
        <br />
        Pipes
      </Logo>
      <Menu>
        <MenuItem>
          <UIButton text="Play" onClick={() => history.push("/game")} />
        </MenuItem>
        <MenuItem>
          <UIButton
            text="High Score"
            onClick={() => history.push("/high-scores")}
          />
        </MenuItem>
        <MenuItem>
          <UIButton text="About" onClick={() => history.push("/about")} />
        </MenuItem>
      </Menu>
    </Wrapper>
  );
};

export default HomeScreen;
