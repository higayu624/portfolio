package gateway

import (
	"database/sql"
	"fmt"

	"jaglen/entity"
	"jaglen/usecase/port"
)

type UserRepository struct {
	dbHandler *sql.DB
}

func NewUserRepository(dbHandler *sql.DB) port.UserRepository {
	return &UserRepository{
		dbHandler: dbHandler,
	}
}

func (ur UserRepository) InsertUserById(userId int) (user *entity.User, err error) {
	user = &entity.User{}
	err = ur.dbHandler.QueryRow("select * from users where id=$1", userId).Scan(&user.ID, &user.GivenName, &user.FamilyName, &user.DisplayName, &user.MailAddress, &user.UserRole, &user.UserStatus, &user.CreatedAt, &user.UpdatedAt, &user.Products)
	fmt.Print("database user", user)
	if err != nil {
		fmt.Printf("can not set User object: %s", err)
	}
	return
}
