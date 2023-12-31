package port

import (
	"context"

	"portfolioGo/entity"
)

type UserInputPort interface {
	GetUserById(c context.Context, userId int) (user *entity.User, err error)
	GetUserByEmail(email string) (user *entity.User, err error)
	GetUserPostByRecent() (users *entity.Users, err error)
	SignUp(request *entity.User) error
	Withdrawal(request *entity.User) (response bool, err error)
	UpdateUser(request *entity.User, authUser *entity.User) (response bool, err error)
	GetPost(authUser *entity.User) (post *entity.Post, err error)
	CreatePost(authUser *entity.User, post *entity.Post) (response bool, err error)
	DeletePost(authUser *entity.User, post *entity.Post) (response bool, err error)
	UpdatePost(authUser *entity.User, post *entity.Post) (response bool, err error)
}

type UserRepository interface {
	InsertUserById(userId int) (user *entity.User, err error)
	InsertUserByEmail(email string) (user *entity.User, err error)
	InsertUserPostByRecent() (users *entity.Users, err error)
	CreateUser(request *entity.User) error
	DeleteUser(request *entity.User) (response bool, err error)
	InsertPost(authUser *entity.User) (post *entity.Post, err error)
	CreatePost(post *entity.Post) (response bool, err error)
	DeletePost(authUser *entity.User, post *entity.Post) (response bool, err error)
	SoftDeletePost(authUser *entity.User, post *entity.Post) (bool, error)
}
