import * as React from "react";
import { ViewStyle } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { useTheme } from "../../theme/useTheme";

type Props = {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
};

export const Icon: React.FunctionComponent<Props> = ({
  name,
  size = 30,
  color,
  style,
}: Props) => {
  const theme = useTheme();

  return (
    <MaterialIcon
      style={style}
      name={name}
      size={size}
      color={color ? color : theme.colors.white}
    />
  );
};
