// logging-middleware/constants.js

module.exports = {
  VALID_STACKS: ['frontend', 'backend'],
  VALID_LEVELS: ['debug', 'info', 'warn', 'error', 'fatal'],
  VALID_PACKAGES: {
    frontend: ['ui', 'style', 'auth', 'config'],
    backend: ['controller', 'handler', 'cronjob', 'domain', 'repository', 'service', 'auth', 'config']
  },
  LOG_API_URL: 'http://20.244.55.144/evaluation-service/logs'
};
