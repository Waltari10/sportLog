import React from "react";
import { Animated, Easing } from "react-native";

import { Icon } from "../atoms/Icon";

export const LoadingIndicator = () => {
  const [spinValue] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        useNativeDriver: true,
        easing: Easing.linear,
        toValue: -1,
        duration: 3000,
      })
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ rotateZ: spin }],
      }}
    >
      <Icon name="sync" />
    </Animated.View>
  );
};
