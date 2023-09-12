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
  place_id: number;
};
