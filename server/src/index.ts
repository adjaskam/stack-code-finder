import express from "express";
import config from "config";
import log from "./loggers";
import connect from "./db/connect";
import routes from "./routes";
import cors from "cors";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: `http://${host}:${port}`,
  })
);

app.listen(port, host, () => {
  log.info(`Server is listening on: http://${host}:${port}`);
  routes(app);
  connect();
});
