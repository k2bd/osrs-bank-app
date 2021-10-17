import { createDarkTheme } from "baseui";

export type THEME = "dark" | "light";

const dtPrimitives = {};
const dtOverrides = {
  colors: {
    background: "0x000000",
  },
  body: {
    backgroundColor: "0x000000",
  },
};

export const darkTheme = createDarkTheme(dtPrimitives, dtOverrides);
