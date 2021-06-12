import React from "react";
import { ThemeContext } from "./ThemeProvider";

export default () => {
  return React.useContext(ThemeContext);
};
