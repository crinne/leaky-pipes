import styled from "styled-components";

interface ButtonProps {
  small?: boolean;
  left?: boolean;
}

const Button = styled.button<ButtonProps>`
  align-self: ${(props) => (props.left ? "flex-start" : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: Slackey, sans-serif;
  font-size: 3rem;
  color: rgb(100, 120, 0);
  user-select: none;

  width: ${(props) => (props.small ? "12rem" : "25rem")};
  height: 5rem;

  background: rgb(10, 20, 0);
  border: 0.2rem solid rgb(255, 255, 0);

  border-radius: 12px;
  box-shadow: 0.6rem 0.6rem 0.6rem rgb(20, 20, 20);

  &:hover {
    color: rgb(151, 151, 1);
    box-shadow: 0.2rem 0.2rem 0.2rem rgb(255, 255, 0);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

interface Props {
  text: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  small?: boolean;
  left?: boolean;
  disabled?: boolean
}

const UIButton = ({ text, onClick, ...rest }: Props) => {
  return (
    <Button {...rest} onClick={onClick}>
      {text}
    </Button>
  );
};

export default UIButton;
