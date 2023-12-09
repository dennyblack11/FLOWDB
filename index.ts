import express, { Application } from "express";
import cors from "cors";
import env from "dotenv";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
import expressSession from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import MongoDBStore from "connect-mongodb-session";

const mongoConnect = MongoDBStore(expressSession);

env.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT!);

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  expressSession({
    secret: "cookies/session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 12,
    },
    store: new mongoConnect({
      uri: process.env.DATABASE_URL!,
      collection: "session",
    }),
  })
);

mainApp(app);
const server = app.listen(port, () => {
  console.clear();
  console.log();
  dbConfig();
});

process.on(`uncaughtException`, (error: Error) => {
  console.log("uncaughtException: ", error);
  process.exit(1);
});

process.on(`rejectionHandled`, (error: Error) => {
  console.log("rejectionHandled: ", error);
  server.close(() => {
    process.exit(1);
  });
});
