import * as React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import useTheme from "../theme/useTheme";

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export const Icon: React.FunctionComponent<Props> = ({
  name,
  size = 30,
  color,
}: Props) => {
  const theme = useTheme();

  if (!color) {
    color = theme.colors.white;
  }

  return <MaterialIcon name={name} size={size} color={color} />;
};

export default Icon;
