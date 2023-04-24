export type memberType = {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

export type summaryPropsType = {
  count: number;
  title: string;
  description: string;
  children: React.ReactNode;
};

export type categoryType = {
  id: number;
  slug: string;
  name: string;
  selected: boolean;
};

export type notificationDataType = {
  notification_sms: boolean;
  notification_email: boolean;
  notification_system: boolean;
};

export type addressDataType = {
  id: number;
  address: string;
  other_details: string | null;
  contact: string | null;
  contact_name: number[];
  postcode: number | null;
  city: string;
  district: string;
  secondary: number;
  region: {
    id: number;
    name: string;
  };
  created_at: number;
  updated_at: number;
  is_default_shipping: boolean;
  is_default_billing: boolean;
};
