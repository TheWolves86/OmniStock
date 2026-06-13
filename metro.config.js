const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Provide a shim for an internal react-native-web export that some deps import.
// Maps the import path to a local shim file to avoid bundling errors on web.
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  'react-native-web/dist/exports/NativeEventEmitter': path.resolve(__dirname, 'web-shims/NativeEventEmitter.js'),
};

module.exports = config;
