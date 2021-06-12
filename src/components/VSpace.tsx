import * as React from "react";
import { View } from "react-native";
import useTheme from "../theme/useTheme";

interface Props {
  size: number;
}

export const VSpace: React.FunctionComponent<Props> = ({ size }: Props) => {
  const theme = useTheme();
  return <View style={{ width: theme.spacing(size) }}></View>;
};

export default VSpace;
