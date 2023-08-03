package entity

import "time"

type Post struct {
	ID          int       `json:"id"`
	UserId      int       `json:"user_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"` // 説明
	CreateTime  time.Time `json:"create_time"` // 投稿の作成時間
	Status      bool      `json:"status"`      // 投稿を表示していい状態かどうかの判定
	UpdatedAt   time.Time `json:"updated_at"`
	CreatedAt   time.Time `json:"created_at"`
}

type Posts []*Post
