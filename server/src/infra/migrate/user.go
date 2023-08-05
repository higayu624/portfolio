package migrate

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	ID          int
	Pass        []byte
	GivenName   string
	FamilyName  string
	DisplayName string
	MailAddress string
	UserRole    int
	UserStatus  int
	Post        Post
}
