package interactor

import (
	"context"
	"log"

	"portfolioGo/entity"
	"portfolioGo/usecase/port"
)

type UserInteractor struct {
	UserRepository port.UserRepository
}

func NewUserInteractor(userRepository port.UserRepository) *UserInteractor {
	return &UserInteractor{
		UserRepository: userRepository,
	}
}

// GetUserById get User Informations By ID
func (ui UserInteractor) GetUserById(c context.Context, userId int) (user *entity.User, err error) {
	user, err = ui.UserRepository.InsertUserById(userId)
	if err != nil {
		log.Fatalf("getUserById have error %s", err)
	}

	return
}

// GetUserByEmail get User Infomations By Email
func (ui UserInteractor) GetUserByEmail(email string) (user *entity.User, err error) {
	user, err = ui.UserRepository.InsertUserByEmail(email)
	if err != nil {
		log.Fatalf("getUserByEmail have error %s", err)
	}

	return
}
