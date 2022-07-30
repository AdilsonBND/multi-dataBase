module.exports = {
  apps : [{
    name: "app",
    script: "./src/api.js",
    instances: "max",
    env: {
      NODE_ENV: "prod",
    },
    env_production: {
      NODE_ENV: "prod",
    }
  }]
}