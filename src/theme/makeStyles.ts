import { StyleSheet, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Theme } from "./ThemeProvider";

import useTheme from "./useTheme";

// Copy pasted from react-native source code since this is not exported
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export default (createStyles: (theme: Theme) => NamedStyles<unknown>) => {
  return () => {
    const theme = useTheme();

    const themedStyles = createStyles(theme);

    const parsedStyles = StyleSheet.create(themedStyles);

    return parsedStyles;
  };
};
