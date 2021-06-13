import { TextStyle } from "react-native";
import { ThemeContext } from "./ThemeProvider";

interface Shape {
  round: 8;
}

interface Colors {
  white: string;
  background: string;
  grey10: string;
  grey17: string;
  grey25: string;
  grey65: string;
}

interface Fonts {
  header: TextStyle;
  body: TextStyle;
  subtitle: TextStyle;
}

export interface ThemeContext {
  toggleActiveTheme(): void;
  getActiveTheme(): Theme;
  activeTheme: "dark" | "light";
  themeDark: Theme;
  themeLight: Theme;
}

export interface Theme {
  type: "dark" | "light";
  colors: Colors;
  spacing: (size: number) => number;
  shape: Shape;
  fonts: Fonts;
}

const marginUnit = 8;

const themeDark: Theme = {
  type: "dark",
  colors: {
    white: "#FFFFFF",
    background: "#2B2B2B",
    grey10: "#1A1A1A",
    grey17: "#2B2B2B",
    grey25: "#404040",
    grey65: "#A6A6A6",
  },
  spacing: (size) => size * marginUnit,
  fonts: {
    // Scale 1.250
    header: {
      fontSize: 25,
    },
    body: {
      fontSize: 20,
    },
    subtitle: {
      fontSize: 16,
    },
  },
  shape: {
    round: 8,
  },
};

const themeLight: Theme = {
  type: "light",
  colors: {
    white: "#1A1A1A",
    background: "#ffffff",
    grey10: "#E6E6E6",
    grey17: "#D4D4D4",
    grey25: "#BFBFBF",
    grey65: "#595959",
  },
  spacing: (size) => size * marginUnit,
  fonts: {
    // Scale 1.250
    header: {
      fontSize: 25,
    },
    body: {
      fontSize: 20,
    },
    subtitle: {
      fontSize: 16,
    },
  },
  shape: {
    round: 8,
  },
};

const themeContext: ThemeContext = {
  themeDark,
  themeLight,
  activeTheme: "dark",
  toggleActiveTheme: () => {},
  getActiveTheme: () => ({} as Theme),
};

export default themeContext;
