package main

import (
	"log"

	appconfig "jaglen/config"
	"jaglen/infra"
	appdb "jaglen/infra/database"
)

func main() {
	dbConfig := appconfig.DatabaseInfo()
	dbHandler, err := appdb.DatabaseConnector(dbConfig)
	defer dbHandler.Close()
	if err != nil {
		log.Print(err)
	}

	log.Printf("db connect successed!")

	router := infra.InitRouter(dbHandler)
	router.Run(":3001")

	// router := gin.Default()
	// router.GET("/", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{"rwDBconfig": dbConfig})
	// })
	// fmt.Print("rwDBconfig", dbConfig)
	// fmt.Print("Welcome to Postgres", dbHandler)
	// router.Run(":3004")
}
