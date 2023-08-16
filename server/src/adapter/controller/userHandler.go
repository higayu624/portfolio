package controller

import (
	"net/http"

	"portfolioGo/entity"
	"portfolioGo/usecase/port"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	UserInteractor port.UserInputPort
}

func NewUserHandler(UserInteractor port.UserInputPort) *UserHandler {
	return &UserHandler{
		UserInteractor: UserInteractor,
	}
}

func (uh UserHandler) GetUserPostByRecent() gin.HandlerFunc {
	return func(c *gin.Context) {
		res, err := uh.UserInteractor.GetUserPostByRecent(c)
		if err != nil {
			c.Error(err)
			c.Abort()
			return
		}
		c.JSON(http.StatusOK, res)
	}
}

func (uh UserHandler) GetUserById(userId int) gin.HandlerFunc {
	return func(c *gin.Context) {
		res, err := uh.UserInteractor.GetUserById(c, userId)
		if err != nil {
			c.Error(err)
			c.Abort()
			return
		}
		c.JSON(http.StatusOK, res)
	}
}

func (uh UserHandler) GetAUserPost() gin.HandlerFunc {
	return func(c *gin.Context) {
		// c.Getで認証済みのUser情報を取得
		authUser, exist := c.Get("authUser")
		if !exist {
			c.Status(http.StatusBadRequest)
			return
		}
		c.JSON(http.StatusOK, authUser)
	}
}

func (uh UserHandler) Withdrawal() gin.HandlerFunc {
	return func(c *gin.Context) {
		value, exist := c.Get("authUser")
		if !exist {
			c.Status(http.StatusBadRequest)
			return
		}
		authUser := value.(*entity.User)
		response, err := uh.UserInteractor.Withdrawal(authUser)
		if err != nil {
			c.JSON(http.StatusConflict, err)
		}
		c.JSON(http.StatusOK, response)
	}
}
