package http

import (
	"log"
	"net/http"

	"portfolioGo/adapter/controller"
	"portfolioGo/adapter/gateway"
	"portfolioGo/usecase/interactor"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AuthMiddleware(c *gin.Context) {
	tokenString, err := c.Cookie("token")
	log.Print(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Unauthorized",
		})
		c.Abort()
		return
	}

	token, err := controller.ParseToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid token",
		})
		c.Abort()
		return
	}
	log.Print("token ", token)
	c.Next()
}

func SetToContext(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userRepository := gateway.NewUserRepository(db)
		userInteractor := interactor.NewUserInteractor(userRepository)
		mailAddress, err := c.Cookie("mailAddress")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Bad Request",
			})
			c.Abort()
			return
		}

		authUser, err := userInteractor.GetUserByEmail(mailAddress)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Bad Request",
			})
			c.Abort()
			return
		}
		c.Set("authUser", authUser)
		c.Next()
	}
}
