module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 12,
    sourceType: "module",
    project: ["./tsconfig.json"],
    /**
     * Fix: VSCode error adding new files on watch mode,
     * https://github.com/typescript-eslint/typescript-eslint/issues/864#issuecomment-523190869
     * */
    createDefaultProgram: true,
  },
  extends: [
    "@react-native",
    "plugin:@veri.co/veri/node",
    "plugin:@veri.co/veri/react",
    "plugin:@veri.co/veri/react_native",
  ],
  plugins: ["@veri.co/veri"],
  rules: {
    "space-in-brackets": "off",
  },
};
