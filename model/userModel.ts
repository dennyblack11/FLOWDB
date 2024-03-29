import { Schema, model } from "mongoose";
import { iUserData } from "../utils/interfaces";
import { SCHOOL } from "../utils/enums";

const userModel = new Schema<iUserData>(
  {
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
      default: SCHOOL.ADMIN,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
