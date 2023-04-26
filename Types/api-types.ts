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

export type myListingModelType = {
  coverImage: string;
  title: string;
  make: string;
  year: number;
  hightestBid: number;
  soldPrice: number;
  bidEndsIn: number;
  isControlSeller?: boolean;
  isControlBuyer?: boolean;
};
