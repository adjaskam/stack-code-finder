import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import cors from "cors";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//   })
// );

app.listen(port, host, () => {
  log.info(`SERVER_IS_LISTENING_ON: http://${host}:${port}`);
  routes(app);
  connect();
});
