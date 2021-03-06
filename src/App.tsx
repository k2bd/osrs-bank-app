import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme } from "baseui";
import { useLocalStorage } from "react-use-storage";
import NavBar from "./components/NavBar";
import { darkTheme, THEME } from "./style";

const engine = new Styletron();

function App() {
  const [themeLabel] = useLocalStorage<THEME>("theme", "dark");
  const theme = themeLabel === "dark" ? darkTheme : LightTheme;

  return (
    <div
      style={{
        background: themeLabel === "dark" ? "#000000" : "#ffffff",
        margin: "0px",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        overflow: "scroll",
        overflowX: "hidden",
      }}
    >
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <NavBar />
        </BaseProvider>
      </StyletronProvider>
    </div>
  );
}

export default App;
