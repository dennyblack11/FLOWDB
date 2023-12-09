import { HTTP } from "../utils/enums";

export interface iError {
  name: string;
  message: string;
  status: HTTP;
  success: boolean;
}

export interface iUser {
  email: string;
  password: string;
  token: string;
  schoolName: string;
  schoolCode: string;
  status: string;
  verify: boolean;
}

export interface iUserData extends iUser, Document {}
