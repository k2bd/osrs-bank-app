import {
  ALIGN,
  HeaderNavigation,
  StyledNavigationItem,
  StyledNavigationList,
} from "baseui/header-navigation";
import { SiBuymeacoffee } from "react-icons/si";
import { StyledLink } from "baseui/link";
import { useLocalStorage } from "react-use-storage";
import { THEME } from "../style";
import { Button } from "baseui/button";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Label1 } from "baseui/typography";
import { styled } from "styletron-react";

const Sticky = styled("div", {
  position: "sticky",
  top: "0px",
  width: "100vw",
  zIndex: 1000,
});

const NavBar = () => {
  const [theme, setTheme] = useLocalStorage<THEME>("theme", "dark");

  const themeButton = (
    <Button
      shape="circle"
      kind="tertiary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
    </Button>
  );

  return (
    <Sticky>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            <Label1>OSRS Item Tags</Label1>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <StyledLink
              href="https://www.buymeacoffee.com/k2bd"
              target="_blank"
            >
              <Button
                startEnhancer={() => <SiBuymeacoffee />}
                shape="pill"
                kind="tertiary"
              >
                Support
              </Button>
            </StyledLink>
          </StyledNavigationItem>
          <StyledNavigationItem>{themeButton}</StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
    </Sticky>
  );
};

export default NavBar;
