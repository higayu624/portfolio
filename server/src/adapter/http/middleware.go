package http

import (
	"fmt"
	"log"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func LoginCheckMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Print("0")
		session := sessions.Default(c)
		log.Print("1")
		// sessionからJsonを取得する
		if session == nil {
			fmt.Print("authUser is nothing")
		} else {
			authUser := session.Get("AuthUser")
			c.Set("AuthUser", authUser)
			c.Next()
		}
	}
}
