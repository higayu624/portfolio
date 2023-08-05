package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	appconfig "portfolioGo/config"

	_ "github.com/lib/pq"
)

// DatabseConnector connects database and return database handler of sql.DB
func DatabaseConnector(dbConfig *appconfig.PostgresInfo) (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%d sslmode=%s TimeZone=Asia/Tokyo",
		dbConfig.Host,
		dbConfig.User,
		dbConfig.Password,
		dbConfig.Name,
		dbConfig.Port,
		dbConfig.SslMode,
	)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, err
}
