package entity

import "time"

type User struct {
	ID          int       `json:"id"`
	GivenName   string    `json:"given_name"`
	FamilyName  string    `json:"family_name"`
	DisplayName string    `json:"display_name"`
	MailAddress string    `json:"mail_address"`
	UserRole    int       `json:"user_role"`
	UserStatus  int       `json:"user_status"`
	Posts       *Posts    `json:"posts"`
	UpdatedAt   time.Time `json:"updated_at"`
	CreatedAt   time.Time `json:"created_at"`
}
