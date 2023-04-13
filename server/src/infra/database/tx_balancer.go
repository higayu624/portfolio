package database

import (
	"context"
	"database/sql"
)

type TxBalancer struct {
	rw TxBeginner
}

func NewTxBalancer(rw TxBeginner) *TxBalancer {
	return &TxBalancer{rw}
}

func (tb TxBalancer) BeginTx(ctx context.Context, to *sql.TxOptions) (*sql.Tx, error) {
	tx := tb.rw
	return tx.BeginTx(ctx, to)
}

type TxBeginner interface {
	BeginTx(ctx context.Context, opts *sql.TxOptions) (*sql.Tx, error)
}
