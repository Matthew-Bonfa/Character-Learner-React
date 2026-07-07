import React, { useContext } from "react"
import styled from "styled-components"
import "../index.css"
import SVGComponent from "./SVGcomponent";
import { useGlobalContext } from "./GlobalProvider";
import { PageContext } from "../App";

const CircleButton = styled.button <{ color: string, animation?: string, text?: string }>`
    height: 70%;
    aspect-ratio: 1;
    border-radius: ${({ text }) => text ? "0%" : "50%"};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.color.third};
    color: ${({ color }) => color};
    margin: clamp(10px, 2%, 20px);
    margin-left: 0;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: ${({ animation }) => animation || ""};
        background-color: ${({ text }) => (text ? "transparent" : ({ theme }) => theme.shadow.text[30])};
        cursor: pointer;
    }

    &:active {
        transform: translateY(0.3em);
    }

`;

const ButtonText = styled.span<{ animation?: string }>`
    font-family: outfit;
    height: 100%;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    padding: 0 15%;
    transition: all 0.2s ease-in-out;
    font-size: 110%;

    &:hover {
        font-size: 120%;
        transform: ${({ animation }) => animation || ""};
        background-color: ${({ theme }) => theme.shadow.text[30]};
        cursor: pointer;
    }
`;

interface NavButtonProps {
  id: "profile" | "content" | "settings";
  svg?: React.FC<React.SVGProps<SVGSVGElement>>;
  text?: string;
  color: string;
  animation?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ id, svg, text, color, animation }: NavButtonProps) => {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    throw new Error("404");
  }

  const { currentPage, setCurrentPage } = pageContext;

  const {
    userSettings: { settingsMode },
    globalFunctions: { toggleSettings }
  } = useGlobalContext();

  const handleNavButtonClick = () => {
    if (id === currentPage) {
      setCurrentPage("main");
    }
    else if (id === "profile") {

    }
    else if (id == "settings") {
      toggleSettings();
    }
    else if (id == "content") {
      setCurrentPage(id);
    }
  }

  return (
    <CircleButton
      color={color}
      animation={animation}
      text={text}
      onClick={handleNavButtonClick}
    >
      {svg ? (
        <SVGComponent
          SVG={svg}
          color={color}
        />
      ) : (
        <ButtonText
          animation={animation}
        >
          {text}
        </ButtonText>
      )}
    </CircleButton>
  )
}

export default NavButton
