import styled, { useTheme } from "styled-components";
import Logo from "./Logo";
import NavButton from "./NavButton";
import profileIcon from "../assets/profile-icon.svg?react";
import cogIcon from "../assets/cog-icon.svg?react";
import { useContext, useEffect } from "react";
import { PageContext } from "../App";

const NavContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row-reverse;
    place-items: center;
    width: 100vw;
    height: 4rem;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.color.third};
`

function NavBar() {
  const theme = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty("--texxt-color", theme.color.text);
    document.documentElement.style.setProperty("--first-color", theme.color.first);
    document.documentElement.style.setProperty("--second-color", theme.color.second);
    document.documentElement.style.setProperty("--third-color", theme.color.third);
  }, [theme]);

  const pageContext = useContext(PageContext);
  if (!pageContext) {
    throw new Error("404");
  }
  const { currentPage } = pageContext;

  return (
    <NavContainer>
      <NavButton
        id="profile"
        svg={profileIcon}
        color={theme.color.text}
      />
      <NavButton
        id="settings"
        svg={cogIcon}
        color={theme.color.text}
        animation={"rotate(90deg)"}
      />
      <NavButton
        id="content"
        text={currentPage === "content" ? "RETURN" : "CONTENT"}
        color={theme.color.text}
      />
      <Logo />
    </NavContainer>
  )
}

export default NavBar;
