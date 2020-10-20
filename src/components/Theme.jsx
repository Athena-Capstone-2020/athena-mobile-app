import {
  createBox, 
  createText,
  createTheme, 
  ThemeProvider as ReStyleThemeProvider,
  useTheme as useReTheme
} from "@shopify/restyle";
import React from "react";

const palette = {
  orange: "#FE724C",
  grey: "#D0CED5",
};

const theme = createTheme({
  colors: {
    primary: palette.orange,
    grey: palette.grey,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {},
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export const ThemeProvider = ({ children }) => (
  <ReStyleThemeProvider {...{ theme }}>{children}</ReStyleThemeProvider>
);

export const Box = createBox();
export const Text = createText();
export const useTheme = () => useReTheme();

export const makeStyles = styles => {
  const currentTheme = useTheme();
  return styles(currentTheme);
};

export default theme;