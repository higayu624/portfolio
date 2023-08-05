package http

import (
	"fmt"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func LoginCheckMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
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
