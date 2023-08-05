package migrate

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model

	ID          int
	UserId      uint
	Title       string
	Description string
	CreateTime  time.Time
	Status      bool
}
