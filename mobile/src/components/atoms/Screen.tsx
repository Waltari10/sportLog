import React from "react";
import { View, ViewStyle } from "react-native";

import { makeStyles } from "../../theme/makeStyles";
import { Theme } from "../../theme/theme";

type Props = {
  style?: ViewStyle;
  children?: React.ReactNode;
};

export const Screen = ({ style, ...rest }: Props) => {
  const styles = useStyles();
  return <View style={[styles.root, style]} {...rest} />;
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  };
});
