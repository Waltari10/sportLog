import * as React from "react";
import themeContext from ".";

export const ThemeContext = React.createContext(themeContext);

const ThemeProvider: React.FunctionComponent = (props) => {
  const [themeType, setThemeType] = React.useState("dark");

  const toggleActiveTheme = () => {
    if (themeType === "dark") {
      setThemeType("light");
    } else if (themeType === "light") {
      setThemeType("dark");
    }
  };

  const getActiveTheme = () => {
    if (themeType === "dark") {
      return themeContext.themeDark;
    } else if (themeType === "light") {
      return themeContext.themeLight;
    } else {
      return themeContext.themeDark;
    }
  };

  return (
    <ThemeContext.Provider
      value={{ ...themeContext, toggleActiveTheme, getActiveTheme }}
      {...props}
    />
  );
};

export default ThemeProvider;
