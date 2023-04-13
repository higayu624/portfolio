package entity

import "time"

type Product struct {
	ID              int              `json:"id"`
	UserId          int              `json:"user_id"`
	ProductLink     string           `json:"product_link"`
	Title           string           `json:"title"`
	SubTitle        string           `json:"sub_title"`
	Exposition      string           `json:"exposition"`
	AppealPoint     string           `json:"appeal_point"`
	TechnicalStacks *TechnicalStacks `json:"technical_stacks"`
	UpdatedAt       time.Time        `json:"updated_at"`
	CreatedAt       time.Time        `json:"created_at"`
}

type Products []*Product
