import React from "react";

import { StateProvider } from "./library/StateProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Navigation } from "./Navigation";

const App = () => {
  return (
    <StateProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </StateProvider>
  );
};

export default App;
