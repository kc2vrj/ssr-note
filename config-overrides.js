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
    "fs": require.resolve("browserify-fs"), // Use the polyfill
    "net": require.resolve("node-libs-browser/mock/net"),
    "tls": require.resolve("node-libs-browser/mock/tls"),
    "child_process": false,
    "timers": require.resolve("timers-browserify"),
    "timers/promises": require.resolve("timers-browserify"),
    "fs/promises": require.resolve("browserify-fs"),
    "path": require.resolve("path-browserify"),
    "process": require.resolve("process/browser"),
    "vm": require.resolve("vm-browserify"),
    "dns": require.resolve("node-libs-browser/mock/dns")
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
