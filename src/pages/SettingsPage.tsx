import styled from "styled-components";
import SettingsToggle from "../components/SettingsToggle";
import { useGlobalContext } from "../components/GlobalProvider";
import SettingsSwapper from "../components/SettingsSwapper";

const SettingsContainer = styled.section`
    position: fixed;
    top: 4.5rem; /* Below navbar */
    right: 1rem;
    width: 20rem;
    max-width: 90%;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.color.first};
    color: ${({ theme }) => theme.color.text};
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    padding: 1.5rem;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const SettingsTitle = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.color.text};
    font-size: 1.5rem;
`;

const SettingsSection = styled.div`
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.third};

    &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
    }
`;

const SettingsLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.text};
    font-size: 1rem;
`;

const SettingsCloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.color.text};
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:hover {
        background-color: ${({ theme }) => theme.color.third};
    }
`;

function SettingsPage() {
  const {
    userSettings: { darkMode, forceKanji, enableRomaji, displayMode, writeMode },
    globalFunctions: {
      toggleDarkMode,
      toggleForceKanji,
      toggleEnableRomaji,
      updateDisplayMode,
      updateWriteMode,
      setSettingsMode
    }
  } = useGlobalContext();

  // Close settings when clicking outside the panel
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setSettingsMode(false);
    }
  };

  return (
    <div onClick={handleOutsideClick} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999
    }}>
      <SettingsContainer onClick={(e) => e.stopPropagation()}>
        <SettingsCloseButton onClick={() => setSettingsMode(false)}>×</SettingsCloseButton>
        <SettingsTitle>Settings</SettingsTitle>

        <SettingsSection>
          <SettingsLabel>Appearance</SettingsLabel>
          <SettingsToggle
            message="Dark Mode"
            toggle={darkMode}
            toggleFunc={toggleDarkMode}
          />
          <SettingsToggle
            message="Force Kanji Display"
            toggle={forceKanji}
            toggleFunc={toggleForceKanji}
          />
          <SettingsToggle
            message="Enable Typed Romaji"
            toggle={enableRomaji}
            toggleFunc={toggleEnableRomaji}
          />
        </SettingsSection>

        <SettingsSection>
          <SettingsLabel>Display Preferences</SettingsLabel>
          <SettingsSwapper
            mode={displayMode}
            updateMode={updateDisplayMode}
          />
          <SettingsSwapper
            mode={writeMode}
            updateMode={updateWriteMode}
          />
        </SettingsSection>
      </SettingsContainer>
    </div>
  )
}

export default SettingsPage;
