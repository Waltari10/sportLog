import React from "react";
import ThemeProvider from "./theme/ThemeProvider";
import StateProvider from "./StateProvider";

import App from "./App";

export default function Root(): JSX.Element {
  return (
    <StateProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StateProvider>
  );
}
