"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainApp_1 = require("./mainApp");
const dbConfig_1 = require("./utils/dbConfig");
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const mongoConnect = (0, connect_mongodb_session_1.default)(express_session_1.default);
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: "cookies/session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
    },
    store: new mongoConnect({
        uri: process.env.DATABASE_URL,
        collection: "session",
    }),
}));
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    console.clear();
    console.log();
    (0, dbConfig_1.dbConfig)();
});
process.on(`uncaughtException`, (error) => {
    console.log("uncaughtException: ", error);
    process.exit(1);
});
process.on(`rejectionHandled`, (error) => {
    console.log("rejectionHandled: ", error);
    server.close(() => {
        process.exit(1);
    });
});
