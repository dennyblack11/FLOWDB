"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHOOL = exports.HTTP = void 0;
var HTTP;
(function (HTTP) {
    HTTP[HTTP["OK"] = 200] = "OK";
    HTTP[HTTP["CREATED"] = 201] = "CREATED";
    HTTP[HTTP["BAD_REQUEST"] = 404] = "BAD_REQUEST";
})(HTTP || (exports.HTTP = HTTP = {}));
var SCHOOL;
(function (SCHOOL) {
    SCHOOL["ADMIN"] = "admin";
    SCHOOL["TEACHER"] = "teacher";
    SCHOOL["STUDENT"] = "student";
})(SCHOOL || (exports.SCHOOL = SCHOOL = {}));
