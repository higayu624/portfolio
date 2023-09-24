package controller

import (
	"net/http"
	"time"

	"portfolioGo/entity"
	"portfolioGo/usecase/port"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
)

type UserHandler struct {
	UserInteractor port.UserInputPort
}

func NewUserHandler(UserInteractor port.UserInputPort) *UserHandler {
	return &UserHandler{
		UserInteractor: UserInteractor,
	}
}

type responseUserForHome struct {
	GivenName   string `json:"given_name"`
	FamilyName  string `json:"family_name"`
	DisplayName string `json:"display_name"`
	PlaceID     int    `json:"place_id"`
	Post        responsePostForHome
}

type responsePostForHome struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

func (uh UserHandler) GetUserPostByRecent() gin.HandlerFunc {
	return func(c *gin.Context) {
		res, err := uh.UserInteractor.GetUserPostByRecent(c)
		if err != nil {
			c.Error(err)
			c.Abort()
			return
		}
		response := refillToResponseHome(res)
		c.JSON(http.StatusOK, response)
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

func (uh UserHandler) UpdateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		// request を受け取る
		var request *entity.User
		err := c.BindJSON(&request)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return
		}
		// 認証済みのユーザ情報を受け取る
		value, exist := c.Get("authUser")
		if !exist {
			c.Status(http.StatusBadRequest)
			return
		}
		authUser := value.(*entity.User)
		response, err := uh.UserInteractor.UpdateUser(request, authUser)
		if err != nil {
			c.JSON(http.StatusConflict, err)
		}
		c.JSON(http.StatusOK, response)
	}
}

func (uh UserHandler) GetPost() gin.HandlerFunc {
	return func(c *gin.Context) {
		value, exist := c.Get("authUser")
		if !exist {
			c.Status(http.StatusBadRequest)
			return
		}
		authUser := value.(*entity.User)
		post, err := uh.UserInteractor.GetPost(authUser)
		if err != nil {
			c.JSON(http.StatusConflict, err)
		}
		c.JSON(http.StatusOK, post)
	}
}

func (uh UserHandler) CreatePost() gin.HandlerFunc {
	return func(c *gin.Context) {
		var request *entity.Post
		err := c.BindJSON(&request)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return
		}
		request.CreateTime = time.Now()
		value, exist := c.Get("authUser")
		if !exist {
			c.Status(http.StatusBadRequest)
			return
		}
		authUser := value.(*entity.User)
		request.UserId = uint(authUser.ID)
		post, err := uh.UserInteractor.CreatePost(authUser, request)
		if err != nil {
			c.JSON(http.StatusConflict, err)
		}
		c.JSON(http.StatusOK, post)
	}
}

func (uh UserHandler) DeletePost() gin.HandlerFunc {
	return func(c *gin.Context) {
		var request *entity.Post
		err := c.BindJSON(&request)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return
		}
		value, exist := c.Get("authUser")
		if !exist {
			c.Status(http.StatusBadRequest)
			return
		}
		authUser := value.(*entity.User)
		response, err := uh.UserInteractor.DeletePost(authUser, request)
		if err != nil {
			c.JSON(http.StatusConflict, err)
		}
		c.JSON(http.StatusOK, response)
	}
}

// TODO: createで前のIDを引き継いだ形でcreateしなければいけない
func (uh UserHandler) UpdatePost() gin.HandlerFunc {
	return func(c *gin.Context) {
		// request を受け取る
		var request *entity.Post
		err := c.BindJSON(&request)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return
		}
		// 認証済みのユーザ情報を受け取る
		value, exist := c.Get("authUser")
		if !exist {
			c.Status(http.StatusBadRequest)
			return
		}
		authUser := value.(*entity.User)
		response, err := uh.UserInteractor.UpdatePost(authUser, request)
		if err != nil {
			c.JSON(http.StatusConflict, err)
		}
		c.JSON(http.StatusOK, response)
	}
}

func refillToResponseHome(userPosts *entity.Users) []responseUserForHome {
	var responseHome []responseUserForHome
	for _, userPost := range *userPosts {
		var responseUserForHome responseUserForHome
		if err := copier.Copy(&responseUserForHome, &userPost); err != nil {
			panic(err)
		}
		responseHome = append(responseHome, responseUserForHome)
	}
	return responseHome
}
