"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("../utils/enums");
const userModel = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    schoolCode: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        default: enums_1.SCHOOL.ADMIN,
    },
    verify: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
