import * as React from "react";
import { TextStyle } from "react-native";
import { Text } from "react-native";
import makeStyles from "../theme/makeStyles";
import useTheme from "../theme/useTheme";

interface Props {
  type: "header" | "body" | "subtitle";
  color?: string;
  style?: TextStyle;
}

const useStyles = makeStyles((theme) => theme.fonts);

const Typography: React.FunctionComponent<Props> = ({
  type,
  color,
  style,
  ...rest
}) => {
  const theme = useTheme();
  const styles = useStyles();

  if (!color) {
    color = theme.colors.white;
  }

  return <Text style={[{ ...styles[type], color }, style]} {...rest}></Text>;
};

export default Typography;
