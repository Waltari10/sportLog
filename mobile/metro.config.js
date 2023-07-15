const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");

const additionalPaths = {
  common: path.resolve(path.join(__dirname, "../common/src")),
};

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Always load react-native from app's node_modules (instead of attempting e.g. common/node_modules)
    extraNodeModules: new Proxy(
      {},
      {
        // Always load all external dependencies from app's node_modules (instead of attempting e.g. common/node_modules)
        get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
      }
    ),
  },
  watchFolders: Object.values(additionalPaths),
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
