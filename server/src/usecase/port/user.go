package port

import (
	"context"

	"portfolioGo/entity"
)

type UserInputPort interface {
	GetUserById(c context.Context, userId int) (entity.User, error)
}

type UserOutputPort interface {
	RenderUserById(c context.Context, res entity.User)
}

type UserRepository interface {
	InsertUserById(userId int) (*entity.User, error)
}
