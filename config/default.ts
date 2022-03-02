import "dotenv/config";

const {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_NAME,
  MONGO_DB_PORT,
  MONGO_DB_SERVICE_NAME,
} = process.env;

export default {
  port: 3000,
  host: "0.0.0.0",
  dbUri: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_SERVICE_NAME}:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`,
};
