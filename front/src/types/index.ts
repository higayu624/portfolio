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
  web_link: string;
  address: string;
  post: {
    title: string;
    description: string;
  };
};

export type NewPost = {
  title: string;
  description: string;
  status: boolean;
};

export type Post = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  create_time: string;
  status: string;
};

export type Response = {
  post: Post;
  display_name: string;
  family_name: string;
  given_name: string;
  id: number;
  mail_address: string;
  pass: string;
  place_id: number;
  user_role: number;
  user_status: number;
};

export type LoginFormContent = {
  mail_address: string;
  pass: string;
};

export type Zipcode = {
  main: string;
  sub: string;
};

export type Address = {
  address1: string;
  address2: string;
  address3: string;
  address: string;
};

export type SignUpForm = {
  name: string;
  email: string;
  password: string;
  familyName: string;
  givenName: string;
  displayName: string;
  place1: number;
  place2: number;
  address: string;
};

export type CouponForm = {
  title: string;
  description: string;
  status: boolean;
};
