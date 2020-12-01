import React from "react";
import { StyleSheet, LogBox } from "react-native";
import { Provider } from "./Provider";
import { LoadAssets } from "./src/components/index";
import { ThemeProvider } from './src/components/Theme'
import Athena from './src/screens/Athena'

export default function App() {
  LogBox.ignoreLogs(['Warning: ...'])
  LogBox.ignoreAllLogs()

  return (
    <Provider>
      <ThemeProvider>
        <LoadAssets>
          <Athena />
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
