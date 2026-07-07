import styled from "styled-components";


const Button = styled.div<{ id: "Kanji" | "Kana" | "English", edge: string, mode: "Kanji" | "Kana" | "English" }>`
    display: flex;
    width: 27%;
    justify-content: center;    
    align-items: center;
    border-radius :${({ edge }) => {
    if (edge === "left") {
      return "99px 0% 0% 99px";
    } else if (edge === "right") {
      return "0% 99px 99px 0%";
    } else {
      return "0";
    }
  }};
    aspect-ratio: 24/9;
    background-color: ${({ id, mode, theme }) => id === mode ? theme.color.accent : theme.color.second};
    transition: all 0.2s ease-in-out;

    box-shadow: 0 0.2em 0 ${({ theme }) => theme.color.third};

    &:hover {
        background-color: ${({ id, mode, theme }) => id === mode ? theme.color.accent : theme.color.first};
        cursor: pointer;
    }

    & > span {
        transition: transform 0.2s ease-in-out;
    }

    &:active > span {
        transform: ${({ id, mode }) => id === mode ? "" : "translateY(2px)"};
    }
`

interface SwapperButtonProps {
  id: "Kanji" | "Kana" | "English"
  edge: "left" | "middle" | "right"
  mode: "Kanji" | "Kana" | "English"
  updateMode: (mode: "Kanji" | "Kana" | "English") => void
}

function SwapperButton({ id, edge, mode, updateMode }: SwapperButtonProps) {
  const handleOnClick = () => {
    if (mode === id) {
      return;
    }
    updateMode(id);
  }

  return (
    <Button
      id={id}
      edge={edge}
      mode={mode}
      onClick={handleOnClick}
    >
      <span>{id}</span>
    </Button>
  )
}

export default SwapperButton;
