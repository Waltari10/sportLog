import React from "react";
import { StatusBar } from "react-native";
import ThemeProvider from "./theme/ThemeProvider";

import App from "./App";

export default function Root(): JSX.Element {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
