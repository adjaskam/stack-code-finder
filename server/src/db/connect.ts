import mongoose from "mongoose";
import config from "config";
import log from "../loggers";

var promiseRetry = require("promise-retry");
const dbUri = config.get("dbUri") as string;

const promiseRetryOptions = {
  retries: 60,
  factor: 2,
  minTimeout: 1000,
  maxTimeout: 5000,
};

const connect = () => {
  return promiseRetry((retry: any, number: Number) => {
    log.info(`Mongo connecting to ${dbUri} - attempt: ${number}`);
    return mongoose.connect(dbUri).catch(retry);
  }, promiseRetryOptions);
};

export default connect;
