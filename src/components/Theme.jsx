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
  greyBlue1: "#9DA4BB",
  greyBlue2: "#8387A7",
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
    greyBlue1: palette.greyBlue1,
    greyBlue2: palette.greyBlue2,
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
    buttonAlt: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Semibold",
      textAlign: "center",
      background: "white",
      text: "primary"
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
    },
    recentSearchesTitle: {
      fontSize: 18,
      fontFamily: "SFProDisplay-Semibold",
    },
    recentSearches: {
      fontSize: 15.4,
      fontFamily: "SFProDisplay-Regular",
    },
    barcodeInstructions: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Regular",
      color: "greyBlue2"
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