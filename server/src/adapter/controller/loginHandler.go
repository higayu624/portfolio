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

		// TODO: values := [] string{token, authUser.MailAddress}
		cookie := new(http.Cookie)
		cookie.Value = authUser.MailAddress // Cookieに入れる値　mailaddress
		c.SetSameSite(http.SameSiteNoneMode)
		// cookieセット TODO: *本番の時はlocalhostをそのサイトのドメインに変更する
		c.SetCookie("mailAddress", cookie.Value, 3600, "/", "18.183.235.67", true, true)
		cookie.Value = token // Cookieに入れる値　token
		c.SetCookie("token", cookie.Value, 3600, "/", "18.183.235.67", true, true)
		c.JSON(http.StatusOK, true)
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

		Response := true
		c.JSON(http.StatusOK, Response)
	}
}

// logout
func (lh LoginHandler) Logout() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.SetSameSite(http.SameSiteNoneMode)
		c.SetCookie("mailAddress", "", -1, "/", "localhost", true, true)
		c.SetCookie("token", "", -1, "/", "localhost", true, true)
		Response := true
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
