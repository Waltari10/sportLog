interface Colors {
  white: string;
  background: string;
  grey10: string;
  grey17: string;
  grey25: string;
  grey65: string;
}

const fonts = {
  // Scale 1.250
  header: {
    fontSize: 26,
  },
  body: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
  },
} as const;

const shape = {
  round: 8,
} as const;

export interface Theme {
  type: "dark" | "light";
  colors: Colors;
  spacing: (size: number) => number;
  shape: typeof shape;
  fonts: typeof fonts;
}

const MARGIN_UNIT = 8;
const spacing = (size: number) => size * MARGIN_UNIT;

export const themeDark: Theme = {
  type: "dark",
  colors: {
    white: "#FFFFFF",
    background: "#2B2B2B",
    grey10: "#1A1A1A",
    grey17: "#2B2B2B",
    grey25: "#404040",
    grey65: "#A6A6A6",
  },
  spacing,
  fonts,
  shape: {
    round: 8,
  },
};

export const themeLight: Theme = {
  type: "light",
  colors: {
    white: "#1A1A1A",
    background: "#ffffff",
    grey10: "#E6E6E6",
    grey17: "#D4D4D4",
    grey25: "#BFBFBF",
    grey65: "#595959",
  },
  spacing,
  fonts,
  shape: {
    round: 8,
  },
};
