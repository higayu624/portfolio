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

// InsertUserPostByRecent Insert User and Post Information from new Posts
func (ur UserRepository) InsertUserPostByRecent() (users *entity.Users, err error) {
	users = &entity.Users{}
	// activate := true

	err = ur.dbHandler.Preload("Post", "status = ?", true).Find(&users).Error

	return
}

// InsertUserById Insert User Informations By Id
func (ur UserRepository) InsertUserById(userId int) (user *entity.User, err error) {
	// 初期化
	user = &entity.User{}
	// insert処理
	db := ur.dbHandler.Where("id = ?", userId)
	err = db.Find(&user).Commit().Error

	if err != nil {
		fmt.Printf("can not set User object: %s", err)
	}
	return
}

// InsertUserByEmail Insert User Informations By Email
func (ur UserRepository) InsertUserByEmail(email string) (user *entity.User, err error) {
	user = &entity.User{}

	err = ur.dbHandler.Preload("Post", "status = ?", true).Find(&user, "mail_address = ?", email).Error
	if err != nil {
		fmt.Printf("can not set User Object: %s", err)
	}

	return
}

func (ur UserRepository) CreateUser(request *entity.User) error {
	tx := ur.dbHandler.Begin()
	// create
	if err := tx.Create(&request).Error; err != nil {
		tx.Rollback()
		return err
	}
	// commit
	err := tx.Commit().Error
	if err != nil {
		return err
	}

	return err
}

func (ur UserRepository) DeleteUser(request *entity.User) (response bool, err error) {
	tx := ur.dbHandler.Begin()
	if err := tx.Select("Post").Delete(&request).Error; err != nil {
		tx.Rollback()
		return false, err
	}
	// commit
	err = tx.Commit().Error
	if err != nil {
		return false, err
	}
	response = true

	return
}

func (ur UserRepository) InsertPost(authUser *entity.User) (post *entity.Post, err error) {
	post = &entity.Post{}
	// TODO: delated_at がnilでないときは取得する
	err = ur.dbHandler.Model(&authUser).Association("Post").Find(&post)
	if err != nil {
		return nil, err
	}
	return
}

func (ur UserRepository) CreatePost(post *entity.Post) (response bool, err error) {
	tx := ur.dbHandler.Begin()
	if err = tx.Create(&post).Error; err != nil {
		tx.Rollback()
		return false, err
	}
	err = tx.Commit().Error
	if err != nil {
		return false, err
	}
	response = true
	return
}

func (ur UserRepository) DeletePost(authUser *entity.User, post *entity.Post) (response bool, err error) {
	tx := ur.dbHandler.Begin()
	if err = tx.Model(&authUser).Association("Post").Delete(&post); err != nil {
		tx.Rollback()
		return false, err
	}
	err = tx.Commit().Error
	if err != nil {
		return false, err
	}
	response = true
	return
}

func (ur UserRepository) SoftDeletePost(authUser *entity.User, post *entity.Post) (bool, error) {
	tx := ur.dbHandler.Begin()
	if err := tx.Model(&authUser).Association("Post").Unscoped().Clear(); err != nil {
		tx.Rollback()
		return false, err
	}
	err := tx.Commit().Error
	if err != nil {
		return false, err
	}
	response := true
	return response, nil
}
