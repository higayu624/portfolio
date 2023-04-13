package entity

import "time"

type TechnicalStack struct {
	ID            int       `json:"id"`
	ProductId     int       `json:"product_id"`
	TechnicalName string    `json:"technical_name"`
	TechnicalType string    `json:"technical_type"`
	UpdatedAt     time.Time `json:"updated_at"`
	CreatedAt     time.Time `json:"created_at"`
}

type TechnicalStacks []*TechnicalStack
