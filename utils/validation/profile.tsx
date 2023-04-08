import * as yup from "yup";

export function checkValidNewMember(email: string, role: string[]) {
  const schema = yup.object().shape({
    email: yup.string().email("email_not_valid").required("email_is_required"),
    role: yup
      .array()
      .min(1, "role_is_required")
      .max(2, "role_is_required")
      .required("role_is_required"),
  });

  return schema.validate({
    email: email,
    role: role,
  });
}
