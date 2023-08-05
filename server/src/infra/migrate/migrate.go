package migrate

import (
	"log"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// 　Migrate make table layout
func Migrate(db *gorm.DB) {
	db.AutoMigrate(&User{}, &Post{})
}

// Seed add datas to tables
func Seed(db *gorm.DB) {
	user0 := getDatas()
	if err := db.Create(user0).Error; err != nil {
		log.Print("error: ", err)
	}
}

// getDatas return datas for migrate
func getDatas() (user0 *User) {
	passRow := []byte("pass")
	pass, _ := bcrypt.GenerateFromPassword(passRow, bcrypt.DefaultCost)
	user0 = &User{
		ID:          0,
		Pass:        pass,
		GivenName:   "Yuma",
		FamilyName:  "Higashitani",
		DisplayName: "Gattani",
		MailAddress: "higayu624@gmail.com",
		UserRole:    0,
		UserStatus:  0,
		Post: Post{
			ID:          0,
			UserId:      0,
			Title:       "今暇じゃけえ来てくれたらサービスしちゃる",
			Description: "これ見たっていってくれれば10%OFFにするけえ、来ておくれ！",
			CreateTime:  time.Now(),
			Status:      true,
		},
	}
	return
}
