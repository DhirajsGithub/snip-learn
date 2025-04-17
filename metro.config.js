const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Start with your custom config
const customConfig = {
  // Add any custom Metro config options here
};

// Get the default config
const defaultConfig = getDefaultConfig(__dirname);

// Merge the default config with your custom options
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// Wrap the merged config with Reanimated's metro config wrapper
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
