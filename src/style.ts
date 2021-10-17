import { createDarkTheme } from "baseui";
import { ThemePrimitives } from "baseui/theme";

export type THEME = "dark" | "light";

const dtPrimitives: Partial<ThemePrimitives> = {};
const dtOverrides = {};

export const darkTheme = createDarkTheme(dtPrimitives, dtOverrides);
