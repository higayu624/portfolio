package presenter

import (
	"context"

	"portfolioGo/entity"

	"github.com/gin-gonic/gin"
)

type UserPresenter struct{}

func NewUserPresenter(router gin.Engine) *UserPresenter {
	return &UserPresenter{}
}

func (up UserPresenter) RenderUserById(c context.Context, res entity.User) {
}
