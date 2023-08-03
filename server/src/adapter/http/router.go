package http

import (
	"portfolioGo/adapter/controller"
	appgateway "portfolioGo/adapter/gateway"
	"portfolioGo/adapter/presenter"
	"portfolioGo/usecase/interactor"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var userAPIRoot = "user"

func InitRouter(db *gorm.DB) *gin.Engine {
	router := gin.Default()
	router.ContextWithFallback = true

	userPresenter := presenter.NewUserPresenter(*router)
	userRepository := appgateway.NewUserRepository(db)
	UserInteractor := interactor.NewUserInteractor(userPresenter, userRepository)

	userGroup := router.Group(userAPIRoot)
	{
		route := ""
		UserHandler := controller.NewUserHandler(*UserInteractor)
		userGroup.Use()

		userGroup.GET(route, UserHandler.GetUserById(0))
	}
	return router
}
