const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    "util": require.resolve("util/"),
    "stream": require.resolve("stream-browserify"),
    "crypto": require.resolve("crypto-browserify"),
    "url": require.resolve("url/"),
    "assert": require.resolve("assert/"),
    "os": require.resolve("os-browserify/browser"),
    "https": require.resolve("https-browserify"),
    "querystring": require.resolve("querystring-es3"),
    "zlib": require.resolve("browserify-zlib"),
    "timers": require.resolve("timers-browserify"),
    "http": require.resolve("stream-http"),
    "fs": require.resolve("fs-browser"), // Use the polyfill
    "path": require.resolve("path-browserify"),
    "process": require.resolve("process/browser"),
    "vm": require.resolve("vm-browserify")
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
