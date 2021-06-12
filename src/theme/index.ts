interface Shape {
  round: 8;
}

interface Colors {
  white: string;
  background: string;
  grey10: string;
  grey17: string;
  grey25: string;
}

export interface Theme {
  type: "dark" | "light";
  colors: Colors;
  spacing: (size: number) => number;
  shape: Shape;
  fonts: unknown;
}

const marginUnit = 8;

const theme: Theme = {
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

export default theme;
