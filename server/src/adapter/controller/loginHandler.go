package controller

import (
	"net/http"
	"unsafe"

	"portfolioGo/entity"
	"portfolioGo/usecase/port"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"golang.org/x/crypto/bcrypt"
)

type LoginHandler struct {
	UserInteractor port.UserInputPort
}

func NewLoginHandler(UserInteractor port.UserInputPort) *LoginHandler {
	return &LoginHandler{
		UserInteractor: UserInteractor,
	}
}

type authResponse struct {
	ID          int         `json:"id"`
	Pass        string      `json:"pass"`
	GivenName   string      `json:"given_name"`
	FamilyName  string      `json:"family_name"`
	DisplayName string      `json:"display_name"`
	MailAddress string      `json:"mail_address"`
	UserRole    int         `json:"user_role"`
	UserStatus  int         `json:"user_status"`
	PlaceID     int         `json:"place_id"`
	JWT         string      `json:"jwt"`
	Post        entity.Post `gorm:"foreignKey:UserId"`
}

type SignUpResponse struct {
	MailAddress string `json:"mail_address"`
	JWT         string `json:"jwt"`
}

func (lh LoginHandler) Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		var request entity.EmailLoginRequest
		err := c.BindJSON(&request)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return
		}
		// requestのメールからuser情報を取得
		authUser, err := lh.UserInteractor.GetUserByEmail(request.Email)
		if err != nil {
			c.JSON(http.StatusConflict, err)
			return
		}
		// ハッシュ値でのパスワード比較
		err = bcrypt.CompareHashAndPassword([]byte(authUser.Pass), []byte(request.Pass))
		if err != nil {
			c.Status(http.StatusBadRequest)
			return
		}
		// token生成
		token, err := GenerateToken(authUser.MailAddress)
		if err != nil {
			c.Error(err)
			c.Abort()
			return
		}

		// 構造体の詰め替え
		response := refillToAuthResponse(authUser)
		response.JWT = token

		// TODO: values := [] string{token, authUser.MailAddress}
		cookie := new(http.Cookie)
		cookie.Value = authUser.MailAddress // Cookieに入れる値
		c.SetSameSite(http.SameSiteNoneMode)
		// cookieセット TODO: *本番の時はlocalhostをそのサイトのドメインに変更する
		c.SetCookie("mailAddress", cookie.Value, 3600, "/", "localhost", true, true)
		cookie.Value = token // Cookieに入れる値
		c.SetCookie("token", cookie.Value, 3600, "/", "localhost", true, true)
		c.JSON(http.StatusOK, response)
	}
}

func (lh LoginHandler) SignUp() gin.HandlerFunc {
	return func(c *gin.Context) {
		var request *entity.User
		err := c.BindJSON(&request)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return
		}

		// passwordのhash化
		request.Pass = makePassHash(request.Pass)

		err = lh.UserInteractor.SignUp(request)
		if err != nil {
			c.Error(err)
			c.Abort()
			return
		}
		token, err := GenerateToken(request.MailAddress)
		if err != nil {
			c.Error(err)
			c.Abort()
			return
		}
		var Response SignUpResponse
		Response.MailAddress = request.MailAddress
		Response.JWT = token

		cookie := new(http.Cookie)
		cookie.Value = request.MailAddress
		c.SetSameSite(http.SameSiteNoneMode)
		// cookieセット TODO: *本番の時はlocalhostをそのサイトのドメインに変更する
		c.SetCookie("mailAddress", cookie.Value, 3600, "/", "localhost", true, true)
		cookie.Value = token // Cookieに入れる値
		c.SetCookie("token", cookie.Value, 3600, "/", "localhost", true, true)
		c.JSON(http.StatusOK, Response)
	}
}

func refillToAuthResponse(user *entity.User) *authResponse {
	var authResponse authResponse
	if err := copier.Copy(&authResponse, &user); err != nil {
		panic(err)
	}
	return &authResponse
}

func makePassHash(pass string) string {
	passRow := []byte(pass)
	password, err := bcrypt.GenerateFromPassword(passRow, bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	return *(*string)(unsafe.Pointer(&password))
}
