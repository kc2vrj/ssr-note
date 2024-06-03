module.exports = {
    // ...
    resolve: {
      fallback: {
        "util": false,
        "stream": false,
        "crypto": false,
        "url": false,
        "assert": false,
        "net": false,
        "tls": false,
        "fs": false 
      }
    }};