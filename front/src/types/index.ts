export type Credential = {
  mail_address: string;
  pass: string;
};

export type RequiredInformation = {
  mail_address: string;
  pass: string;
  given_name: string;
  family_name: string;
  display_name: string;
  user_role: number;
  user_status: number;
  place_id: number;
};

export type NewPost = {
  title: string;
  description: string;
  status: boolean;
};
