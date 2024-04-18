const config = {
  user: "fundmeadmin", // better stored in an app setting such as process.env.DB_USER
  password: "Admin@123", // better stored in an app setting such as process.env.DB_PASSWORD
  server: "fundmeapp.database.windows.net", // better stored in an app setting such as process.env.DB_SERVER
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: "fundMeApp", // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

module.exports = config;
