const dotenv = require("dotenv").config({ path: "path-to-.env" });

const config = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "135071Aa*",
    database: "food_db",
  },
};

module.exports = config;
