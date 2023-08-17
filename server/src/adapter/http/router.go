package http

import (
	"portfolioGo/adapter/controller"
	appgateway "portfolioGo/adapter/gateway"
	"portfolioGo/usecase/interactor"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	userAPIRoot   = "user"
	loginAPIRoot  = "login"
	signUpAPIRoot = "signUp"
	allAPIRoot    = "home"
)

func InitRouter(db *gorm.DB) *gin.Engine {
	router := gin.Default()
	router.ContextWithFallback = true

	// define interface
	userRepository := appgateway.NewUserRepository(db)
	UserInteractor := interactor.NewUserInteractor(userRepository)

	// Login
	LoginHandler := controller.NewLoginHandler(*UserInteractor)
	router.POST(loginAPIRoot, LoginHandler.Login())
	router.POST(signUpAPIRoot, LoginHandler.SignUp())

	// init Page
	allHandler := controller.NewUserHandler(*UserInteractor)
	router.GET(allAPIRoot, allHandler.GetUserPostByRecent())

	// User
	userGroup := router.Group(userAPIRoot)
	{
		route := ""
		UserHandler := controller.NewUserHandler(*UserInteractor)
		userGroup.Use(
			AuthMiddleware,
			SetToContext(db),
		)

		route = ""
		userGroup.GET(route, UserHandler.GetAUserPost())
		userGroup.DELETE(route, UserHandler.Withdrawal())
		userGroup.PUT(route, UserHandler.UpdateUser())

		route = "post"
		userGroup.GET(route, UserHandler.GetPost())
		userGroup.POST(route, UserHandler.CreatePost())
		userGroup.DELETE(route, UserHandler.DeletePost())
		userGroup.PUT(route, UserHandler.UpdatePost())
	}
	return router
}
