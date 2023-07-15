import React from "react";
import { StateProvider } from "library/StateProvider";
import { Navigation } from "Navigation";
import { ThemeProvider } from "theme/ThemeProvider";

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
