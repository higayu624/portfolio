package entity

type EmailLoginRequest struct {
	Email string `json:"email"`
	Pass  string `json:"pass"`
}
