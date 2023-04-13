package interactor

import (
	"context"
	"log"

	"jaglen/entity"
	"jaglen/usecase/port"
)

type UserInteractor struct {
	UserOutputPort port.UserOutputPort
	UserRepository port.UserRepository
}

func NewUserInteractor(userOutputPort port.UserOutputPort, userRepository port.UserRepository) *UserInteractor {
	return &UserInteractor{
		UserOutputPort: userOutputPort,
		UserRepository: userRepository,
	}
}

func (ui UserInteractor) GetUserById(c context.Context, userId int) (entity.User, error) {
	user, err := ui.UserRepository.InsertUserById(userId)
	if err != nil {
		log.Fatalf("getUserById have error %s", err)
	}
	// JSONに変換
	return *user, err
}
