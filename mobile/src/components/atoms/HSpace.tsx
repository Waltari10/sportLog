import * as React from "react";
import { View } from "react-native";

import { useTheme } from "../../theme/hooks";

type Props = {
  size: number;
};

export const HSpace: React.FunctionComponent<Props> = ({ size }: Props) => {
  const theme = useTheme();
  return <View style={{ height: theme.spacing(size) }} />;
};
