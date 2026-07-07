import styled from "styled-components";
import SwapperButton from "./SwapperButton";

const SwapperContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 2.5%;
    color: ${({ theme }) => theme.color.text};
`

interface SettingsSwapperProps {
  mode: "Kanji" | "Kana" | "English"
  updateMode: (mode: "Kanji" | "Kana" | "English") => void
}

function SettingsSwapper({ mode, updateMode }: SettingsSwapperProps) {
  return (
    <SwapperContainer>
      <SwapperButton
        id={"Kanji"}
        edge={"left"}
        mode={mode}
        updateMode={updateMode}
      />

      <SwapperButton
        id={"Kana"}
        edge={"middle"}
        mode={mode}
        updateMode={updateMode}
      />

      <SwapperButton
        id={"English"}
        edge={"right"}
        mode={mode}
        updateMode={updateMode}
      />
    </SwapperContainer>
  )
}

export default SettingsSwapper;
