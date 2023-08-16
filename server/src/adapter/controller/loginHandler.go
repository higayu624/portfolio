package controller

import (
	"log"
	"net/http"

	"portfolioGo/entity"
	"portfolioGo/usecase/port"

	"github.com/gin-gonic/gin"
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
			log.Print(err)
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

		// cookieセット TODO: *本番の時はlocalhostをそのサイトのドメインに変更する
		c.SetCookie("token", token, 3600, "", "localhost", true, true)
		c.JSON(http.StatusOK, authUser)
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
		res, err := lh.UserInteractor.SignUp(request)
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
		// cookieセット TODO: *本番の時はlocalhostをそのサイトのドメインに変更する
		c.SetCookie("token", token, 3600, "/", "localhost", false, true)
		c.JSON(http.StatusOK, res)
	}
}
