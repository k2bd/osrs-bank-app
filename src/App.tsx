import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, styled, LightTheme } from "baseui";
import ItemsList from "./components/ItemsList";
import { useLocalStorage } from "react-use-storage";
import NavBar from "./components/NavBar";
import { darkTheme, THEME } from "./style";

const engine = new Styletron();
const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

function App() {
  const [themeLabel] = useLocalStorage<THEME>("theme", "dark");
  const theme = themeLabel === "dark" ? darkTheme : LightTheme;

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={theme}>
        <NavBar />
        <ItemsList />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
