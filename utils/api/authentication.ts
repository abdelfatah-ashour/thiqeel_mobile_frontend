import { axios } from ".";
import { createNewPasswordType, verifyCodeType } from "../../Types/api-types";
import { authenticateStateType } from "../../Types/authentication";

export function loginApi(data: authenticateStateType) {
  return axios({
    method: "POST",
    url: "/login",
    data,
  });
}

export function registerApi(data: authenticateStateType) {
  return axios({
    method: "POST",
    url: "/register",
    data,
  });
}

export function forgetPasswordApi(data: { [key: string]: string }) {
  console.log(data);
  return axios({
    method: "POST",
    url: "/send-otp",
    data,
  });
}

export function sendCodeApi(data: verifyCodeType) {
  return axios({
    method: "POST",
    url: "/login/verify-otp",
    data,
  });
}

export function createNewPasswordApi(data: createNewPasswordType) {
  return axios({
    method: "POST",
    url: "/password-reset",
    data,
  });
}
