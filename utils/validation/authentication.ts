import * as yup from "yup";
import { authenticateStateType } from "../../Types/authentication";
import { PATTERN_PASSWORD_REGISTER, phoneExpire } from "../constant";

export function loginValidation(payload: authenticateStateType) {
  let schemaValidate;
  if (payload.type === "email") {
    schemaValidate = yup.object({
      email: yup
        .string()
        .email("email_not_valid")
        .required("email_is_required"),
    });
  }

  if (payload.type === "phone") {
    schemaValidate = yup.object({
      phone: yup
        .string()
        .matches(phoneExpire, "phone_number_not_valid")
        .required("phone_number_is_required"),
    });
  }

  return schemaValidate?.validate(payload, {
    abortEarly: false,
  });
}

export function registerValidation(payload: authenticateStateType) {
  let schemaValidate;
  if (payload.type === "email") {
    schemaValidate = yup.object({
      email: yup
        .string()
        .email("email_not_valid")
        .required("email_is_required"),
      password: yup
        .string()
        .matches(PATTERN_PASSWORD_REGISTER, "password_not_valid")
        .required("password_is_required"),
    });
  }

  if (payload.type === "phone") {
    schemaValidate = yup.object({
      phone: yup
        .string()
        .matches(phoneExpire, "phone_number_not_valid")
        .required("phone_number_is_required"),
      password: yup
        .string()
        .matches(PATTERN_PASSWORD_REGISTER, "password_not_valid")
        .required("password_is_required"),
    });
  }

  return schemaValidate?.validate(payload, {
    abortEarly: false,
  });
}

export function forgetPasswordValidator(payload: authenticateStateType) {
  let schemaValidate;
  if (payload.type === "email") {
    schemaValidate = yup.object({
      email: yup
        .string()
        .email("email_not_valid")
        .required("email_is_required"),
    });
  }

  if (payload.type === "phone") {
    schemaValidate = yup.object({
      phone: yup
        .string()
        .matches(phoneExpire, "phone_number_not_valid")
        .required("phone_number_is_required"),
    });
  }

  return schemaValidate?.validate(payload, {
    abortEarly: false,
  });
}

export function createNewPasswordValidator(payload: { new_password: string }) {
  console.log(
    "🚀 ~ file: authentication.ts:89 ~ createNewPasswordValidator ~ payload:",
    payload,
  );
  let schemaValidate = yup.object({
    new_password: yup
      .string()
      .matches(PATTERN_PASSWORD_REGISTER, "password_not_valid")
      .required("password_is_required"),
  });

  return schemaValidate?.validate(payload, {
    abortEarly: false,
  });
}
