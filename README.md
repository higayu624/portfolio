# 飲食店のクーポン発行アプリ

地元の友人や飲食店さんに使用してもらいたいという思いから飲食店のクーポン発行アプリを作成しました。UI はイメージ画像に示す通りで、マップ上から地区を選択することでその地区のクーポンが表示されるような直感的に操作できるアプリになってます。
<br>

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3457971/7f7f7795-e2ca-aa8c-ccaa-f61b09e27dc1.png)

# 特徴

一日に一回投稿できて 1 時間のみ情報が表示されます。このことは、飲食店さんごとに時間で差別化することでクーポンが埋もれづらくする狙いとユーザに最新の情報を常に提供する狙いがあります。

# テーブル

このアプリケーションの DB テーブルは画像の通りです。
ユーザ情報を取り扱うテーブルとクーポン情報を取り扱うテーブルがあります。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3457971/a0a97a70-d4b5-447d-dd85-4097404a4b21.png)

# 技術スタックと選定理由

- Go (Gin)
  プロダクトがグロースすることを想定して UX を向上させるため処理速度の速い Golang を選定しました。

<br>

- TypeScript (Next.js)
  ネイティブアプリのような SPA のアプリケーションで UI/UX を向上させるために SPA の実装が容易にできる TypeScript & Next.js を選定しました。

# Usage

実行方法

```bash
git clone https://github.com/higayu624/portfolio.git
cd portfolio/server
make init-local-dev
```

# Note

まだ完成系ではないため、さらに改善していく
デプロイ時の変更で、バージョンによってはローカル環境でうまく動作しない可能性があります。

# Author

作成情報を列挙する

- 東谷 有真
- 広島市立大学大学院
- higayu624@gmail.com
-
- 阿比留 祥太
- 広島市立大学大学院
