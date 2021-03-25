module.exports = {
  apps: [{
    name: 'pinetodo',
    script: './bin/www',
    exec_mode : "cluster",
    instances: 1,
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: './error.log',
    out_file: './output.log',
    merge_logs: true,
    min_uptime: '5s',
    cwd: './',
    ignore_watch: [
      'node_modules',
    ]
  }],
};
