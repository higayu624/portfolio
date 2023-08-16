package controller

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateToken(mailAddress string) (tokenString string, err error) {
	secretKey := os.Getenv("SECRET_KEY")
	tokenLifeTime := 60

	claims := jwt.MapClaims{
		"mail_address": mailAddress,
		"exp":          time.Now().Add(time.Hour * time.Duration(tokenLifeTime)).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err = token.SignedString([]byte(secretKey))
	if err != nil {
		return
	}
	log.Print("0")

	return
}

func ParseToken(tokenString string) (token *jwt.Token, err error) {
	token, err = jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpectedsigning method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil {
		return
	}
	return token, nil
}
