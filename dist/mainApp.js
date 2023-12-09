"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const mainError_1 = require("./error/mainError");
const handleError_1 = require("./error/handleError");
const enums_1 = require("./utils/enums");
const mainApp = (app) => {
    try {
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Awesome API!!!",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error",
                });
            }
        });
        app.all("*", (req, res, next) => {
            next(new mainError_1.mainError({
                name: "Route Error",
                message: `This endpoint you entered ${req.originalUrl} doesn't exist`,
                status: enums_1.HTTP.BAD_REQUEST,
                success: false,
            }));
        });
        app.use(handleError_1.handleError);
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
