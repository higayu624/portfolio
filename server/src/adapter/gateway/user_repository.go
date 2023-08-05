package gateway

import (
	"fmt"

	"portfolioGo/entity"
	"portfolioGo/usecase/port"

	"gorm.io/gorm"
)

type UserRepository struct {
	dbHandler *gorm.DB
}

func NewUserRepository(dbHandler *gorm.DB) port.UserRepository {
	return &UserRepository{
		dbHandler: dbHandler,
	}
}

// InsertUserById Insert User Informations By Id
func (ur UserRepository) InsertUserById(userId int) (user *entity.User, err error) {
	// 初期化
	user = &entity.User{}
	// tranzaction
	tx := ur.dbHandler.Begin()
	// insert処理
	tx = tx.Where("id = ?", userId)
	err = tx.Find(&user).Commit().Error

	if err != nil {
		fmt.Printf("can not set User object: %s", err)
	}
	return
}

// InsertUserByEmail Insert User Informations By Email
func (ur UserRepository) InsertUserByEmail(email string) (user *entity.User, err error) {
	user = &entity.User{}

	tx := ur.dbHandler.Begin()
	tx = tx.Where("mail_address = ?", email)
	err = tx.Find(&user).Commit().Error
	if err != nil {
		fmt.Printf("can not set User Object: %s", err)
	}

	return
}
