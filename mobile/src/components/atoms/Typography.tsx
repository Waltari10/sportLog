import * as React from "react";
import { TextStyle } from "react-native";
import { Text } from "react-native";

import { useTheme } from "../../theme/hooks";
import { makeStyles } from "../../theme/makeStyles";

type Props = {
  type: "header" | "body" | "subtitle";
  color?: string;
  style?: TextStyle;
  children?: React.ReactNode;
};

const useStyles = makeStyles(theme => theme.fonts);

export const Typography = ({ type, color, style, ...rest }: Props) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <Text
      style={[{ ...styles[type], color: color || theme.colors.white }, style]}
      {...rest}
    />
  );
};
