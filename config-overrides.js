const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    util: require.resolve('util/'),
    url: require.resolve('url/'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
  };

  return config;
};