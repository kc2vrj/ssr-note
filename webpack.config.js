module.exports = {
  // ...
  resolve: {
    fallback: {
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "os": require.resolve("os-browserify/browser"),
      "querystring": require.resolve("querystring-es3"),
      "zlib": require.resolve("browserify-zlib"),
      "timers": require.resolve("timers-browserify"),
      "http": require.resolve("stream-http"),
      "fs": require.resolve("fs-browser") // Use the polyfill
      // Add any other required fallbacks
    }
  },
  node: {
    timers: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval']
  }
};
