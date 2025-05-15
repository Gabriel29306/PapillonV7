const { getDefaultConfig } = require("expo/metro-config");
import os from 'node:os';
import path from 'node:path';


const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("pem", "json", "rawjs", "css");

// Documentation: https://docs.expo.dev/versions/latest/config/metro/#mocking-modules
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "openid-client") {
    return {
      type: "empty",
    };
  }

  // Ensure you call the default resolver.
  return context.resolveRequest(context, moduleName, platform);
};

config.cacheStores = ({ FileStore }) => [
  new FileStore({
    root: path.join(os.tmpdir(), 'metro-cache'),
  }),
];

export default config;
