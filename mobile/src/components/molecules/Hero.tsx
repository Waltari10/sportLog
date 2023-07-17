import * as React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

import { makeStyles } from "../../theme/makeStyles";
import { Theme } from "../../theme/theme";
import { Typography } from "../atoms/Typography";

type Props = {
  text: string;
  style?: ViewStyle;
  onPress?: () => void;
};

export const Hero: React.FunctionComponent<Props> = ({
  style,
  text,
  onPress,
}: Props) => {
  const styles = useStyles();
  return (
    <TouchableOpacity onPress={onPress} style={[styles.hero, style]}>
      <Typography style={styles.text} type="body">
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    hero: {
      borderRadius: 100,
      width: theme.spacing(8),
      height: theme.spacing(8),
      marginRight: theme.spacing(2),
      backgroundColor: theme.colors.grey25,
      justifyContent: "center",
    },
    text: { textAlign: "center" },
  };
});
