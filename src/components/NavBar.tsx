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
import { useState } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import ItemsList from "./ItemsList";
import { useGetTagGroups } from "../hooks/api";
import TagGroupsList from "./TagGroupsList";
import TagImporter from "./TagImporter";

const Sticky = styled("div", {
  position: "sticky",
  top: "0px",
  width: "100vw",
  zIndex: 1000,
});

const PaddedRight = styled("div", {
  paddingRight: "20px",
});

const NavBar = () => {
  const [theme, setTheme] = useLocalStorage<THEME>("theme", "dark");
  const [activeTab, setActiveTab] = useState("0");

  const [
    { data: availableTagGroups, loading: availableTagGroupsLoading },
    refetchTagGroups,
  ] = useGetTagGroups({});

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
    <>
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
            <PaddedRight>
              <StyledNavigationItem>{themeButton}</StyledNavigationItem>
            </PaddedRight>
          </StyledNavigationList>
        </HeaderNavigation>
      </Sticky>
      <Tabs
        activeKey={activeTab}
        onChange={({ activeKey }) => setActiveTab(activeKey.toString())}
        activateOnFocus
      >
        <Tab title="Items">
          <ItemsList
            availableTagGroups={availableTagGroups ?? []}
            loading={availableTagGroupsLoading}
            refetchTagGroups={async () => {
              await refetchTagGroups();
            }}
          />
        </Tab>
        <Tab title="Tags">
          <TagGroupsList
            availableTagGroups={availableTagGroups ?? []}
            loading={availableTagGroupsLoading}
            refetchTagGroups={async () => {
              await refetchTagGroups();
            }}
          />
        </Tab>
        <Tab title="Import">
          <TagImporter />
        </Tab>
      </Tabs>
    </>
  );
};

export default NavBar;
