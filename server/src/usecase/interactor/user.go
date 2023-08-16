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

// GetUserPostByRecent get User and User's Post By Recent
func (ui UserInteractor) GetUserPostByRecent(c context.Context) (users *entity.Users, err error) {
	users, err = ui.UserRepository.InsertUserPostByRecent()
	if err != nil {
		log.Fatalf("InsertUserPostByRecent have error %s", err)
	}

	return
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

// CreateUser create User
func (ui UserInteractor) SignUp(request *entity.User) (response bool, err error) {
	response, err = ui.UserRepository.CreateUser(request)
	if err != nil {
		log.Fatalf("CreateUser have error %s", err)
	}

	return
}
