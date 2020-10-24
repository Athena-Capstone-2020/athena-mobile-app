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
  greyBlue: "#9DA4BB",
  monochrome1: "#F3F3F3",
  monochrome2: "#E7E7E7",
  white: "#FFFFFF",
  black: "#000000",
  overlay: "#F8F8F8",
};

const theme = createTheme({
  colors: {
    primary: palette.orange,
    grey: palette.grey,
    greyBlue: palette.greyBlue,
    monochrome1: palette.monochrome1,
    monochrome2: palette.monochrome2,
    white: palette.white,
    black: palette.black
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    button: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Semibold",
      textAlign: "center",
      background: "primary",
      text: "white"
    },
    header: {
      fontSize: 18,
      fontFamily: "SFProDisplay-Medium",
      textAlign: "center",
    },
    container: {
      fontSize: 25,
      fontFamily: "SFProDisplay-Semibold",
      color: "black",
    },
    search: {
      fontSize: 14,
      fontFamily: "SFProDisplay-Regular",
      text: "greyBlue",
      background: "monochrome1",
      border: "monochrome2"
    }
  },
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