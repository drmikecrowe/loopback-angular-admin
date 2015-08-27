module.exports = {
  options: {
    HOME:            "/home",
    ROLE:            "loopback",
    API_URL:         "http://0.0.0.0:3000/api",
    NODE_CONFIG_DIR: "./system-config",
    PATH:            "/usr/src/app/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
  },
  dev:     {
    LOOPBACK_SETUP: "no",
    NODE_ENV:       "development",
    DEBUG:          "boot*,server:*,resolver:*"
  },
  test:    {
    LOOPBACK_SETUP: "no",
    NODE_ENV:       "test",
    DEBUG:          "boot*,server:*,resolver:*"
  },
  prod:    {
    LOOPBACK_SETUP: "no",
    NODE_ENV:       "prod"
  },
  setup:   {
    LOOPBACK_SETUP: "setup",
    DEBUG:          "boot*,server:*,resolver:*"
  }
};
