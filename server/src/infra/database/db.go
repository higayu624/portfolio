package database

import (
	"fmt"
	"strconv"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	appconfig "portfolioGo/config"

	_ "github.com/lib/pq"
)

// DatabseConnector connects database and return database handler of sql.DB
func DatabaseConnector(dbConfig *appconfig.PostgresInfo) (*gorm.DB, error) {
	dsn := dbConfig.User + ":" + dbConfig.Password + "@tcp(127.0.0.1:" + strconv.Itoa(dbConfig.Port) + ")/" + dbConfig.Name + "?charset=utf"
	fmt.Printf(dsn)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, err
}
