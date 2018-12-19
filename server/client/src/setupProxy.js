const proxy = require('http-proxy-middleware');

const dev_target =  'http://localhost:5000/'

module.exports = function(app) {
  app.use(proxy('/auth/google', { target: dev_target })),
  app.use(proxy('/api/*', { target: dev_target }));
};
