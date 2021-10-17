import { createDarkTheme, styled } from "baseui";
import { ThemePrimitives } from "baseui/theme";

export type THEME = "dark" | "light";

const dtPrimitives: Partial<ThemePrimitives> = {};
const dtOverrides = {};

export const darkTheme = createDarkTheme(dtPrimitives, dtOverrides);

export const Centered = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const FlexRow = styled("div", {
  display: "flex",
  flexDirection: "row",
});
