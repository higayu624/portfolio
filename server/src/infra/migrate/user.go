package migrate

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Pass        []byte `json:"pass"`
	GivenName   string `json:"given_name"`
	FamilyName  string `json:"family_name"`
	DisplayName string `json:"display_name"`
	WebLink     string `json:"web_link"`
	Address     string `json:"address"`
	MailAddress string `gorm:"uniqueIndex" json:"mail_address"`
	UserRole    int    `json:"user_role"`
	UserStatus  int    `json:"user_status"`
	PlaceID     int    `json:"place_id"`
	Post        Post   `gorm:"foreignKey:UserId"`
}

type Users []User
