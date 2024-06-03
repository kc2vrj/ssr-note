module.exports = {
    // ...
    resolve: {
      fallback: {
        "util": require.resolve("util/"),
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "url": require.resolve("url/"),
        "assert": require.resolve("assert/"),
        "net": false,
        "tls": false,
        "fs": false,
        "os": require.resolve("os-browserify/browser"),
        "path": require.resolve("path-browserify"),
        "http": require.resolve("stream-http")
    }
  }
};
      }
    }};
