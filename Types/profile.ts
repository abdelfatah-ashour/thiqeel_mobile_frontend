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
