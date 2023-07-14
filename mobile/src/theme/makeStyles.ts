import { useMemo } from "react";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

import { Theme } from "./theme";
import { useTheme } from "./useTheme";

type Style = ViewStyle | TextStyle | ImageStyle;

export const makeStyles = (
  createStyles: (theme: Theme) => Record<string, Style>
) => {
  return () => {
    const theme = useTheme();

    return useMemo(() => {
      const themedStyles = createStyles(theme);
      const parsedStyles = StyleSheet.create(themedStyles);
      return parsedStyles;
    }, [theme]);
  };
};
