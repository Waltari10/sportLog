import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { StateProvider } from "library/StateProvider";
import { queryClient } from "library/tanstackQuery";
import { Navigation } from "Navigation";
import { ThemeProvider } from "theme/ThemeProvider";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </StateProvider>
    </QueryClientProvider>
  );
};

export default App;
