import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "./Provider";
import { LoadAssets } from "./src/components/index";
import { ThemeProvider } from './src/components/Theme'
import Navbar from "./src/screens/navbar/Navbar";

export default function App() {
  return (
    <Provider>
      <ThemeProvider>
        <LoadAssets>
          <Navbar />
        </LoadAssets>
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
