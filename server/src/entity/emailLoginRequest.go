package entity

type EmailLoginRequest struct {
	Email string `json:"mail_address"`
	Pass  string `json:"pass"`
}
