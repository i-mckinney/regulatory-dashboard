// init. environment variables
const dotenv = require("dotenv");

dotenv.config();
if (!process.env.PORT) {
  console.error("*****.env file missing! See README.md *****");
} else {
  console.log(`*****ENV PORT: ${process.env.PORT} *****`);
  console.log(`*****ENV NODE_ENV: ${process.env.NODE_ENV} *****`);
}

module.exports = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  entity_config_url: process.env.ENTITY_CONFIG_URL,
  mongo_db_connection_string: process.env.MONGO_DB_CONNECTION_STRING,
  sendgrid_api_key: process.env.SENDGRID_API_KEY,
};
