const plugins = [
  ["@babel/plugin-proposal-decorators", { legacy: true }],
  [
    "module-resolver",
    {
      root: ["./src"],
      extensions: [
        ".ios.ts",
        ".android.ts",
        ".ts",
        ".ios.tsx",
        ".android.tsx",
        ".tsx",
        ".jsx",
        ".js",
        ".json",
      ],
      alias: {
        [`@common`]: "../common/src/",
      },
    },
  ],
];

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins,
};
