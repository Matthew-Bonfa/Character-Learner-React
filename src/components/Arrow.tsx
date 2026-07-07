import styled from "styled-components";
import leftArrowIcon from "../assets/left-arrow-icon.svg?react";
import rightArrowIcon from "../assets/right-arrow-icon.svg?react";

const ArrowButton = styled.button<{ direction: string }>`
    height: 50vh;
    overflow-y: hidden;
    width: min(10vw, 10rem);
    font-size: min(8rem, 8vw);
    margin-left: ${({ direction }) => (direction === "left" ? "2.5vw" : "auto")};
    margin-right: ${({ direction }) => (direction === "right" ? "2.5vw" : "auto")};
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    transition: all 0.2s ease-in-out;
    border-radius: 1rem;
    color: ${({ theme }) => theme.color.text};

    &:hover {
        background-color: ${({ theme }) => theme.shadow.text[15]};
        cursor: pointer;
    }

    &:active {
        background-color: ${({ theme }) => theme.shadow.text[20]};
    }
`

const ArrowSVG = styled.svg`
    transition: all 0.15s ease-in-out;
    height: 100%;

    &:hover {
        transform: scale(1.075);
    }

    &:active {
        padding-top: 0.5rem;
    }
`

interface ArrowProps {
  direction: "left" | "right";
  onClick: (direction: "left" | "right") => void;
  isArrowVisible: boolean;
}

function Arrow({ direction, onClick, isArrowVisible }: ArrowProps) {
  return (
    <ArrowButton
      direction={direction}
      onClick={() => onClick(direction)}
    >
      {isArrowVisible && (
        direction === "left" ? (
          <ArrowSVG
            as={leftArrowIcon}
          />) : (
          <ArrowSVG
            as={rightArrowIcon}
          />
        )
      )}
    </ArrowButton>
  )
}

export default Arrow
