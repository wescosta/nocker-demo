//More info on https://github.com/developit/preact-cli/wiki/Config-Recipes
module.exports = function (config) {
  config.devServer.proxy = [{
    quiet: true,
    path: '/api/**',
    target: 'http://localhost:3000/',
  }];
};