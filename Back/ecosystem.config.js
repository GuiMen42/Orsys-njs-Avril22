module.exports = {
  apps: [
    {
      name: "Gestion Stock",
      script: "./dist/server.js",
      env: {
        PORT: 3000,
      },
      env_production: {
        PORT: 3001,
      },
    },
  ],
};
