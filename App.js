import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "./Provider";
import Navbar from './src/screens/Navbar';

export default function App() {
  return (
    <Provider>
      <Navbar />
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
