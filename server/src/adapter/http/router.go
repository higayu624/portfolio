package http

import (
	"time"

	"portfolioGo/adapter/controller"
	appgateway "portfolioGo/adapter/gateway"
	"portfolioGo/usecase/interactor"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	userAPIRoot   = "user"
	loginAPIRoot  = "login"
	signUpAPIRoot = "signUp"
	logoutAPIRoot = "logout"
	allAPIRoot    = "home"
)

func InitRouter(db *gorm.DB) *gin.Engine {
	router := gin.Default()
	router.ContextWithFallback = true

	router.Use(cors.New(cors.Config{
		// 許可したいHTTPメソッドの一覧
		AllowMethods: []string{
			"POST",
			"GET",
			"OPTIONS",
			"PUT",
			"DELETE",
		},
		// 許可したいHTTPリクエストヘッダの一覧
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"X-CSRF-Token",
			"Authorization",
			"Set-Cookie",
			"Cookies",
		},
		// 許可したいアクセス元の一覧
		AllowOrigins: []string{
			"http://localhost:3000",
		},
		// 自分で許可するしないの処理を書きたい場合は、以下のように書くこともできる
		// cookieなどの情報を必要とするかどうか
		AllowCredentials: true,
		MaxAge:           24 * time.Hour,
	}))

	// define interface
	userRepository := appgateway.NewUserRepository(db)
	UserInteractor := interactor.NewUserInteractor(userRepository)

	// Login
	LoginHandler := controller.NewLoginHandler(*UserInteractor)
	router.POST(loginAPIRoot, LoginHandler.Login())
	router.POST(signUpAPIRoot, LoginHandler.SignUp())
	router.POST(logoutAPIRoot, LoginHandler.Logout())

	// init Page
	allHandler := controller.NewUserHandler(*UserInteractor)
	router.GET(allAPIRoot, allHandler.GetUserPostByRecent())

	// User
	userGroup := router.Group(userAPIRoot)
	{
		UserHandler := controller.NewUserHandler(*UserInteractor)
		userGroup.Use(
			AuthMiddleware,
			SetToContext(db),
		)

		route := ""
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
