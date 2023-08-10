package migrate

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model

	ID          int       `json:"id"`
	UserId      uint      `json:"user_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"` // 説明
	CreateTime  time.Time `json:"create_time"` // 投稿の作成時間
	Status      bool      `json:"status"`      // 投稿を表示していい状態かどうかの判定
}
