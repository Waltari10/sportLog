import "react-native";
import React from "react";
import App from "../src/Root.tsx";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

// eslint-disable-next-line no-undef
it("renders correctly", () => {
  renderer.create(<App />);
});
