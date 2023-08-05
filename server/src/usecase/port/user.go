package port

import (
	"context"

	"portfolioGo/entity"
)

type UserInputPort interface {
	GetUserById(c context.Context, userId int) (user *entity.User, err error)
	GetUserByEmail(email string) (user *entity.User, err error)
}

type UserRepository interface {
	InsertUserById(userId int) (user *entity.User, err error)
	InsertUserByEmail(email string) (user *entity.User, err error)
}
