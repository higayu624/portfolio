package interactor_test

import (
	"testing"
	"time"

	"portfolioGo/entity"

	"portfolioGo/usecase/interactor"
	interactorMock "portfolioGo/usecase/interactor/mock"

	"github.com/golang/mock/gomock"
)

func TestGetPostByRecent(t *testing.T) {
	t.Parallel()

	type output struct {
		users *entity.Users
		err   error
	}

	type want struct {
		users *entity.Users
		err   error
	}

	createTime, err := time.Parse("2006-01-02 15:04:05 +0000 UTC", "0001-01-01 00:00:00 +0000 UTC")
	if err != nil {
		t.Errorf("createTime is error from time.Parse %s", err)
	}

	home := entity.Users{
		{
			ID:          0,
			GivenName:   "Yuma",
			FamilyName:  "Higashitani",
			DisplayName: "Gattani",
			WebLink:     "https://github.com/higayu624/portfolio",
			Address:     "広島県広島市",
			UserRole:    0,
			UserStatus:  0,
			PlaceID:     1,
			Post: entity.Post{
				ID:          0,
				UserID:      0,
				Title:       "今暇じゃけえ来てくれたらサービスしちゃる",
				Description: "これ見たっていってくれれば10%OFFにするけえ、来ておくれ！",
				CreateTime:  createTime,
				Status:      false,
			},
		},
		{
			ID:          0,
			GivenName:   "Shota",
			FamilyName:  "Abiru",
			DisplayName: "Shota",
			WebLink:     "https://github.com/higayu624/portfolio",
			Address:     "広島県広島市",
			UserRole:    0,
			UserStatus:  0,
			PlaceID:     1,
			Post: entity.Post{
				ID:          0,
				UserID:      0,
				Title:       "あびるの店",
				Description: "お店に来て〜",
				CreateTime:  createTime,
				Status:      false,
			},
		},
		{
			ID:          0,
			GivenName:   "ゆうま",
			FamilyName:  "ひがしたに",
			DisplayName: "HIGASHI",
			WebLink:     "https://github.com/higayu624/portfolio",
			Address:     "広島県広島市",
			UserRole:    0,
			UserStatus:  0,
			PlaceID:     1,
			Post: entity.Post{
				ID:          0,
				UserID:      0,
				Title:       "ゆうまの店",
				Description: "いい感じ",
				CreateTime:  createTime,
				Status:      false,
			},
		},
	}

	tests := map[string]struct {
		output output
		want   want
	}{
		"OK": {
			output{
				users: &home,
				err:   nil,
			},
			want{
				users: &home,
				err:   nil,
			},
		},
	}
	for name, tt := range tests {
		t.Run(name, func(t *testing.T) {
			t.Parallel()

			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			repositoryMock := interactorMock.NewMockUserRepository(ctrl)
			repositoryMock.EXPECT().InsertUserPostByRecent().Return(tt.output.users, tt.output.err)

			userInteractor := interactor.UserInteractor{UserRepository: repositoryMock}
			response, err := userInteractor.GetUserPostByRecent()
			if err != nil {
				t.Error(err)
			} else if response != tt.want.users {
				t.Errorf("GetUserPostByRecent's response is not equal want.users")
				t.Errorf("want %v", tt.want.users)
				t.Errorf("response %v", response)
			}
		})
	}
}
