package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"portfolioGo/entity"
	"portfolioGo/usecase/port"

	"github.com/gin-contrib/sessions"
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

func (lh LoginHandler) Login(c *gin.Context) {
	var request entity.EmailLoginRequest
	err := c.BindJSON(&request)
	if err != nil {
		c.Status(http.StatusBadRequest)
	} else {
		user, err := lh.UserInteractor.GetUserByEmail(request.Email)
		if err != nil {
			log.Print(err)
		}
		// ハッシュ値でのパスワード比較
		err = bcrypt.CompareHashAndPassword([]byte(user.Pass), []byte(request.Pass))
		if err != nil {
			c.Status(http.StatusBadRequest)
		} else {
			session := sessions.Default(c)
			// セッションに格納するためにユーザ情報をJSON化
			authUser, err := json.Marshal(user)
			if err == nil {
				session.Set("AuthUser", string(authUser))
				session.Save()
				c.Status(http.StatusOK)
			} else {
				c.Status(http.StatusInternalServerError)
			}
		}
	}
}
