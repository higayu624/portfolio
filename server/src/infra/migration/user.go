package migration

import "gorm.io/gorm"

type User struct {
	gorm.Model

	ID          string
	GivenName   int
	FamilyName  bool
	DisplayName string
	MailAddress string
	UserRole    int
	UserStatus  int
}
