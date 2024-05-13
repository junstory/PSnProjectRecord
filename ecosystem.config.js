module.exports = {
  apps: [
    {
      name: "junstudy",
      script: "server.register.js",
      instances: 1,
      exec_mode: "fork",
      ignore_watch: ["node_modules", "logs", ".git"],
      log_date_format: "YYYY-MM-DD HH:mm",
      output: "logs/pm2/junstudy.ouput.log",
      error: "logs/pm2/junstudy.error.log",
      //merge_logs: true,
      autorestart: true,
      watch: true,
      // max_memory_restart: "512M",
    },
  ],
};
