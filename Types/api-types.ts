export type verifyCodeType = {
  code: string;
  type: "email" | "phone";
  email?: string;
  phone?: string;
};

export type createNewPasswordType = {
  password: string;
  password_confirmation: string;
};
