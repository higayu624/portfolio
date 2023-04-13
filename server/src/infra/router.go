package infra

import (
	"database/sql"

	"jaglen/adapter/controller"
	appgateway "jaglen/adapter/gateway"
	"jaglen/adapter/presenter"
	"jaglen/usecase/interactor"

	"github.com/gin-gonic/gin"
)

var userAPIRoot = "user"

func InitRouter(dbHandler *sql.DB) *gin.Engine {
	router := gin.Default()
	router.ContextWithFallback = true

	// keycloak
	// keycloak := NewLocalKeyCloak()

	userPresenter := presenter.NewUserPresenter(*router)
	userRepository := appgateway.NewUserRepository(dbHandler)
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
