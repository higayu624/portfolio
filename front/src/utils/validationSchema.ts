import { z } from "zod";

export const validationSignupSchema = z.object({
  familyName: z.string().nonempty("名前は必須です."),

  givenName: z.string().nonempty("名前は必須です."),

  displayName: z.string(),

  email: z
    .string()
    .nonempty("メールアドレスは必須です.")
    .email("正しいメールアドレスを入力してください"),

  password: z
    .string()
    .nonempty("パスワードは必須です.")
    .min(4, "パスワードは4文字以上で入力してください"),

  place1: z
    .string()
    .nonempty("お店の郵便番号は必須です.")
    .length(3, "正しくない桁数です."),

  place2: z
    .string()
    .nonempty("お店の郵便番号は必須です.")
    .length(4, "正しくない桁数です."),

  address: z.string().nonempty("お店の住所は必須です."),
});

export const validationLoginSchema = z.object({
  mail_address: z
    .string()
    .nonempty("メールアドレスは必須です.")
    .email("正しいメールアドレスを入力してください"),
  pass: z
    .string()
    .nonempty("パスワードは必須です.")
    .min(4, "パスワードは4文字以上で入力してください"),
});

export const validationUpdateUserSchema = z.object({
  display_name: z.string(),

  family_name: z.string().nonempty("名前は必須です."),

  given_name: z.string().nonempty("名前は必須です."),

  web_link: z
    .string()
    .url("正しいURLの形式ではありません.")
    .or(z.string().length(0)),

  address: z.string().nonempty("お店の住所は必須です."),
});

export const validationPostSchema = z.object({
  title: z
    .string()
    .nonempty("タイトルは必須です")
    .max(20, "20文字以上は入力できません."),
  description: z.string(),
});
