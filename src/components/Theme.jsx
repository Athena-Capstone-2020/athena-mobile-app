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
  onboardingGrey: "#616772",
  onboardingBlack: "#131A38",
  greyBlue1: "#9DA4BB",
  greyBlue2: "#8387A7",
  greyBlue3: "#30384F",
  greyBlue4: "#9796A1",
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
    greyBlue3: palette.greyBlue3,
    greyBlue4: palette.greyBlue4,
    monochrome1: palette.monochrome1,
    monochrome2: palette.monochrome2,
    onboardingGrey: palette.onboardingGrey,
    onboardingBlack: palette.onboardingBlack,
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
    superHeader: {
      fontSize: 36,
      fontFamily: "SFProDisplay-Medium",
      textAlign: "center",
    },
    header: {
      fontSize: 24,
      fontFamily: "SFProDisplay-Medium",
      textAlign: "center",
    },
    body: {
      fontSize: 20,
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
    input: {
      fontSize: 18,
      fontFamily: "SFProDisplay-Semibold",
      text: "black",
      background: "white",
      border: "primary"
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
    },
    boldText: {
      fontSize: 36.41,
      fontFamily: "SFProDisplay-Semibold",
      color: "black"
    },
    subtitleText: {
      fontSize: 20,
      fontFamily: "SFProDisplay-Semibold",
      color: "black",
      opacity: 0.7
    },
    itemDescriptionTitle: {
      fontSize: 31,
      fontFamily: "SFProDisplay-Medium",
      color: "black"
    },
    groceryListName: {
      fontSize: 32,
      fontFamily: "SFProDisplay-Semibold",
      color: "black"
    },
    groceryListItem: {
      fontSize: 20,
      fontFamily: "SFProDisplay-Regular",
      color: "black"
    },
    groceryListItemCompleted: {
      fontSize: 20,
      fontFamily: "SFProDisplay-Regular",
      color: "grey"
    },
    onboardingDesc: {
      fontSize: 17,
      fontFamily: "SFProDisplay-Regular",
      color: "onboardingGrey"
    },
    onboardingTitle: {
      fontSize: 36,
      fontFamily: "SFProDisplay-Medium",
      color: "onboardingBlack"
    },
    signIn: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Medium",
      color: "white"
    },
    Google: {
      fontSize: 13,
      fontFamily: "SFProDisplay-Medium",
      color: "black"
    },
    WelcomeTo: {
      fontSize: 57,
      fontFamily: "SFProDisplay-Bold",
      color: "black"
    },
    Athena: {
      fontSize: 48,
      fontFamily: "SFProDisplay-Regular",
      color: "primary"
    },
    AthenaDesc: {
      fontSize: 21,
      fontFamily: "SFProDisplay-Regular",
      color: "greyBlue3"
    },
    bottomCardContentBody: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Regular",
      opacity: 0.6
    },
    profileName: {
      fontSize: 24,
      fontFamily: "SFProDisplay-Semibold",
      color: 'black'
    },
    householdName: {
      fontSize: 18,
      fontFamily: "SFProDisplay-Semibold",
      color: 'greyBlue4'
    },
    profileButtonText: {
      fontSize: 18,
      fontFamily: "SFProDisplay-Regular",
      color: 'black'
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