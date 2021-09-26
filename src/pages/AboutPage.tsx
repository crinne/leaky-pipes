import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import UIButton from "../components/UIButton";

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;


const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  width: 40rem;
  font-family: "Geo", sans-serif;
  font-size: ${props => props.theme.fontSizes[4]} ;
  color: ${props => props.theme.colors.green};
`;

const AboutPage = () => {
  const history = useHistory();

  return (
    <Container>
      <Logo>About</Logo>
      <AboutContainer>
        <p>
          Leaky pipes is a game where you are a plumber whose job is to fix
          leaking pipes. With every level, the leak is getting bigger and more
          complex. With every level you receive points based on how fast you fix
          leaking pipes.
        </p>
      </AboutContainer>

      <UIButton left={true} small={true} text="Back" onClick={() => history.push("/")}/>
    </Container>
  );
};

export default AboutPage;
