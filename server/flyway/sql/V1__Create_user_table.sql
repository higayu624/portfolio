CREATE TABLE users (
  id serial PRIMARY KEY,
  given_name varchar(30),
  family_name varchar(30),
  display_name varchar(30),
  mail_address varchar(100),
  user_role int,
  user_status int,
  updated_at timestamptz ,
  created_at timestamptz ,
  deleted_at timestamptz
);
COMMENT ON TABLE users IS 'ユーザー';
COMMENT ON COLUMN users.given_name IS '名';
COMMENT ON COLUMN users.family_name IS '姓';
COMMENT ON COLUMN users.display_name IS '表示名';
COMMENT ON COLUMN users.mail_address IS 'メールアドレス';
COMMENT ON COLUMN users.user_role IS 'ロール';
COMMENT ON COLUMN users.user_status IS 'ステータス';