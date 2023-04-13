CREATE TABLE users (
  id serial PRIMARY KEY,
  given_name varchar(30),
  family_name varchar(30),
  display_name varchar(30),
  mail_address varchar(100),
  user_role int,
  user_status int,
  updated_at timestamptz NOT NULL default CURRENT_TIMESTAMP,
  created_at timestamptz NOT NULL default CURRENT_TIMESTAMP,
  deleted_at timestamptz
);
COMMENT ON TABLE users IS 'ユーザー';
COMMENT ON COLUMN users.given_name IS '名';
COMMENT ON COLUMN users.family_name IS '姓';
COMMENT ON COLUMN users.display_name IS '表示名';
COMMENT ON COLUMN users.mail_address IS 'メールアドレス';
COMMENT ON COLUMN users.user_role IS 'ロール';
COMMENT ON COLUMN users.user_status IS 'ステータス';

CREATE TABLE products (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users (id),
  product_link varchar(100),
  title varchar(30),
  sub_title varchar(100),
  exposition varchar(300),
  appeal_point varchar(300),
  updated_at timestamptz NOT NULL default CURRENT_TIMESTAMP,
  created_at timestamptz NOT NULL default CURRENT_TIMESTAMP,
  deleted_at timestamptz
);

CREATE TABLE technical_stacks (
  id serial PRIMARY KEY,
  product_id integer NOT NULL REFERENCES products (id),
  technical_name varchar(30),
  technical_type varchar(30),
  updated_at timestamptz NOT NULL default CURRENT_TIMESTAMP,
  created_at timestamptz NOT NULL default CURRENT_TIMESTAMP,
  deleted_at timestamptz
)