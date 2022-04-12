import "dotenv/config";

const {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_NAME,
  MONGO_DB_PORT,
  MONGO_DB_SERVICE_NAME,
  CODE_FRAGMENTS_FETCH_LIMIT,
  JWT_TOKEN_SECRET,
  STACK_API_KEY,
  HOST,
  PORT,
} = process.env;

export default {
  port: PORT,
  host: HOST,
  dbUri: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_SERVICE_NAME}:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`,
  codeFragmentsFetchLimit: CODE_FRAGMENTS_FETCH_LIMIT,
  jwtTokenSecret: JWT_TOKEN_SECRET,
  stackApiKey: STACK_API_KEY,
};
