package main

import (
	"log"

	"portfolioGo/adapter/http"

	appconfig "portfolioGo/config"
	appdb "portfolioGo/infra/database"
	"portfolioGo/infra/migrate"

	"gorm.io/gorm/logger"
)

func main() {
	dbConfig := appconfig.DatabaseInfo()
	db, err := appdb.DatabaseConnector(dbConfig)
	db.Logger = db.Logger.LogMode(logger.Info)
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
	migrate.Migrate(db)
	log.Printf("migrate successed!")

	// migrate db
	migrate.Seed(db)
	log.Printf("migrate db successed!")

	// build router
	router := http.InitRouter(db)
	router.Run(":7001")
}
