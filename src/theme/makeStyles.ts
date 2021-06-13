import { StyleSheet, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Theme } from ".";
import useTheme from "./useTheme";

type Style = ViewStyle | TextStyle | ImageStyle;

export default (createStyles: (theme: Theme) => Record<string, Style>) => {
  return () => {
    const theme = useTheme();

    const themedStyles = createStyles(theme);

    const parsedStyles = StyleSheet.create(themedStyles);

    return parsedStyles;
  };
};
