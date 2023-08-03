package controller

import (
	"net/http"

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
