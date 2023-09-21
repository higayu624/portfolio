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
func (ui UserInteractor) SignUp(request *entity.User) error {
	err := ui.UserRepository.CreateUser(request)
	if err != nil {
		log.Fatalf("CreateUser have error %s", err)
	}

	return err
}

// Withdrawal delete a User and Post
func (ui UserInteractor) Withdrawal(request *entity.User) (response bool, err error) {
	response, err = ui.UserRepository.DeleteUser(request)
	if err != nil {
		log.Fatalf("DeleteUser have error %s", err)
	}

	return
}

// UpdateUser update User Informations by delete and create with equal ID
func (ui UserInteractor) UpdateUser(request *entity.User, authUser *entity.User) (response bool, err error) {
	userId := authUser.ID
	request.ID = userId

	response, err = ui.UserRepository.DeleteUser(authUser)
	if err != nil {
		log.Fatalf("DeleteUser have error %s", err)
	}
	err = ui.UserRepository.CreateUser(request)
	if err != nil {
		log.Fatalf("CreateUser have error %s", err)
	}

	return
}

func (ui UserInteractor) GetPost(authUser *entity.User) (post *entity.Post, err error) {
	post, err = ui.UserRepository.InsertPost(authUser)
	if err != nil {
		log.Fatal("userRepository have error", err)
	}

	return
}

func (ui UserInteractor) CreatePost(authUser *entity.User, post *entity.Post) (response bool, err error) {
	response, err = ui.UserRepository.SoftDeletePost(authUser, post)
	if err != nil {
		log.Fatal("Repository Soft Delete Post have error")
	}
	response, err = ui.UserRepository.CreatePost(post)
	if err != nil {
		log.Fatal("userRepository have error", err)
	}
	return
}

// DeletePost delete a User and Post
func (ui UserInteractor) DeletePost(authUser *entity.User, post *entity.Post) (response bool, err error) {
	response, err = ui.UserRepository.DeletePost(authUser, post)
	if err != nil {
		log.Fatalf("DeleteUser have error %s", err)
	}

	return
}

func (ui UserInteractor) UpdatePost(authUser *entity.User, post *entity.Post) (response bool, err error) {
	response, err = ui.UserRepository.DeletePost(authUser, &authUser.Post)
	if err != nil {
		log.Fatalf("DeleteUser have error %s", err)
	}
	response, err = ui.UserRepository.CreatePost(post)
	if err != nil {
		log.Fatalf("CreateUser have error %s", err)
	}

	return
}
