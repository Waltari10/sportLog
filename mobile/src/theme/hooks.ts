import React from "react";

import { ThemeContext } from "./ThemeProvider";

export const useTheme = () => useThemeState().theme;

export const useToggleTheme = () => useThemeState().toggleTheme;

export const useThemeState = () => React.useContext(ThemeContext);
