import React, { useMemo } from "react";

import { themeDark, themeLight } from "./theme";

const initialContextState = {
  toggleTheme: () => {},
  theme: themeDark,
};

export const ThemeContext = React.createContext(initialContextState);

type Props = {
  children?: React.ReactNode;
};

export const ThemeProvider = (props: Props) => {
  const [themeType, setThemeType] = React.useState("dark");

  const theme = themeType === "light" ? themeLight : themeDark;

  const value = useMemo(
    () => ({
      toggleTheme: () => setThemeType(themeType === "dark" ? "light" : "dark"),
      theme,
    }),
    [theme, themeType]
  );

  return <ThemeContext.Provider value={value} {...props} />;
};
