import React from "react";

import { ThemeContext } from "./ThemeProvider";

export const useThemeState = () => React.useContext(ThemeContext);
