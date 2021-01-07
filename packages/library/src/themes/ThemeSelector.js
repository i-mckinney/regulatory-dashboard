import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { select } from "@storybook/addon-knobs";
import light from "./light";
import dark from "./dark";
import tropical from "./testTheme";

const themes = { default: light,  dark: dark, tropical: tropical };
const themeNames = Object.keys(themes);

export default ({ children }) => {
  const theme = select(
    "Theme",
    themeNames,
    themeNames[0],
    "Themes"
  );

  return (
    <ThemeProvider theme={themes[theme]}>
      {children}
    </ThemeProvider>
  );
};