import React from "react";

import StateProvider from "./library/StateProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Navigation } from "./Navigation";

export type RootStackParamList = {
  noteList: undefined;
  noteEditor: { note: Note };
};

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
