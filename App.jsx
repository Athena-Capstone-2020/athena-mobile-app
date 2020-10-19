import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "./Provider";
import { ThemeProvider } from './src/components/Theme'
import Navbar from "./src/screens/navbar/Navbar";

export default function App() {
  return (
    <Provider>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
