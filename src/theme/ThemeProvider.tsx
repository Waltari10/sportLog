import * as React from "react";
import theme from ".";

export const ThemeContext = React.createContext(theme);

const ThemeProvider: React.FunctionComponent = (props) => {
  return <ThemeContext.Provider value={theme} {...props} />;
};

export default ThemeProvider;
