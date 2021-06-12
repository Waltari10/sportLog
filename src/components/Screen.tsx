import * as React from "react";
import { View, ViewStyle } from "react-native";
import makeStyles from "../theme/makeStyles";
import { Theme } from "../theme";

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  };
});

interface Props {
  style?: ViewStyle;
}

const Screen: React.FunctionComponent<Props> = ({ style, ...rest }: Props) => {
  const styles = useStyles();
  return <View style={[styles.root, style]} {...rest}></View>;
};

export default Screen;
