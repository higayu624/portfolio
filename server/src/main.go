package main

import (
	"log"

	"portfolioGo/adapter/http"

	appconfig "portfolioGo/config"
	appdb "portfolioGo/infra/database"
	"portfolioGo/infra/migration"
)

func main() {
	dbConfig := appconfig.DatabaseInfo()
	db, err := appdb.DatabaseConnector(dbConfig)
	if err != nil {
		log.Print(err)
	}
	defer func() {
		if sqlDb, err := db.DB(); err == nil {
			sqlDb.Close()
		}
	}()

	log.Printf("db connect successed!")

	// migrate db
	db.AutoMigrate(&migration.User{})
	log.Printf("migrate successed!")

	// build router
	router := http.InitRouter(db)
	router.Run(":3001")
	log.Printf("started router! waiting 3001")

	// router := gin.Default()
	// router.GET("/", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{"rwDBconfig": dbConfig})
	// })
	// fmt.Print("rwDBconfig", dbConfig)
	// fmt.Print("Welcome to Postgres", dbHandler)
	// router.Run(":3004")
}
