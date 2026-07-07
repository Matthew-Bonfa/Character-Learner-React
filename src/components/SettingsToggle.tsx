import styled from "styled-components";
import Switch from '@mui/material/Switch';

const ToggleContainer = styled.div`
    display: flex;
    flex-direction: row;
    place-items: center;
    width: 100%;
    height: 2em;
    margin-bottom: 1%;
    margin-left: 5%;
`;

const SwitchContainer = styled.div`
    margin: 0 2%;
`;

const ToggleLabel = styled.label`
    margin-left: 2%;
`;

interface ToggleProps {
  message: string
  toggle: boolean
  toggleFunc: () => void
}

function SettingsToggle({ message, toggle, toggleFunc }: ToggleProps) {
  return (
    <ToggleContainer>
      <SwitchContainer>
        <Switch
          checked={toggle}
          onClick={toggleFunc}
        />
      </SwitchContainer>
      <ToggleLabel>{message}</ToggleLabel>
    </ToggleContainer>
  )
}

export default SettingsToggle;
