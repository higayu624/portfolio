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
	users := getDatas()
	if err := db.Create(users).Error; err != nil {
		log.Print("error: ", err)
	}
}

// getDatas return datas for migrate
func getDatas() (users Users) {
	passRow := []byte("pass")
	pass, _ := bcrypt.GenerateFromPassword(passRow, bcrypt.DefaultCost)
	users = Users{
		{
			Pass:        pass,
			GivenName:   "Yuma",
			FamilyName:  "Higashitani",
			DisplayName: "Gattani",
			MailAddress: "higayu624@gmail.com",
			UserRole:    0,
			UserStatus:  0,
			PlaceID:     1,
			Post: Post{
				UserId:      1,
				Title:       "今暇じゃけえ来てくれたらサービスしちゃる",
				Description: "これ見たっていってくれれば10%OFFにするけえ、来ておくれ！",
				CreateTime:  time.Now(),
				Status:      true,
			},
		},

		{
			Pass:        pass,
			GivenName:   "Shota",
			FamilyName:  "Abiru",
			DisplayName: "Shota",
			MailAddress: "ShotaAbiru@gmail.com",
			UserRole:    1,
			UserStatus:  0,
			PlaceID:     1,
			Post: Post{
				UserId:      2,
				Title:       "あびるの店",
				Description: "お店に来て〜",
				CreateTime:  time.Now(),
				Status:      true,
			},
		},

		{
			Pass:        pass,
			GivenName:   "ゆうま",
			FamilyName:  "ひがしたに",
			DisplayName: "HIGASHI",
			MailAddress: "higayu6242@gmail.com",
			UserRole:    1,
			UserStatus:  0,
			PlaceID:     1,
			Post: Post{
				UserId:      3,
				Title:       "ゆうまの店",
				Description: "いい感じ",
				CreateTime:  time.Now(),
				Status:      true,
			},
		},
	}

	return
}
