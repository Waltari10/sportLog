import React from "react";
import { ThemeContext } from "./ThemeProvider";

export default () => {
  const themeContext = React.useContext(ThemeContext);

  return themeContext.getActiveTheme();
};
