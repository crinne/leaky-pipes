import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-family: "Slackey";
  text-align: center;
  margin: 0;
  color: rgb(70, 120, 20);
  font-size: 10rem;

  line-height: 8rem;
  text-shadow: 0.2rem 0.2rem 0.2rem rgb(255, 255, 0),
    -0.2rem -0.2rem 0.2rem rgb(255, 255, 0), 0.1rem 0.15rem 0.15rem rgb(0, 0, 0);
`;

interface Props {
  children: React.ReactNode;
}

const Logo = ({ children }: Props) => {
  return <Title>{children}</Title>;
};

export default Logo;

