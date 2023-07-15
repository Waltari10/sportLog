import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "theme/hooks";
import { Theme } from "theme/theme";

/**
 * makeStyles takes in a callback as argument that receives theme as an argument and the callback should return a styling object.
 * makeStyles function itself returns a hook that should be named useStyles which can be called from components to receive the styles object returned by the callback argument.
 *
 * Benefit of this is that the styles are recalculated each time the app theme changes in React Context provided by the ThemeProvider.
 */
export const makeStyles = (
  createStyles: (theme: Theme) => ReturnType<typeof StyleSheet.create>
) => {
  return () => {
    const theme = useTheme();

    return useMemo(() => {
      const themedStyles = createStyles(theme);
      return StyleSheet.create(themedStyles);
    }, [theme]);
  };
};
