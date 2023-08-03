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

func (ur UserRepository) InsertUserById(userId int) (user *entity.User, err error) {
	// 初期化
	user = &entity.User{}
	// tranzaction
	tx := ur.dbHandler.Begin()
	// insert処理
	tx = tx.Where("user_id = ?", userId)
	err = tx.Find(&user).Commit().Error

	if err != nil {
		fmt.Printf("can not set User object: %s", err)
	}
	return
}
