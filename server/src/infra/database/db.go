package database

import (
	"database/sql"
	"fmt"
	"strconv"

	appconfig "jaglen/config"

	_ "github.com/lib/pq"
)

// DatabseConnector connects database and return database handler of sql.DB
func DatabaseConnector(dbConfig *appconfig.PostgresInfo) (*sql.DB, error) {
	dsn := "host=" + dbConfig.Host + " port=" + strconv.Itoa(dbConfig.Port) + " user=" + dbConfig.User + " password=" + dbConfig.Password + " dbname=" + dbConfig.Name + " sslmode=" + dbConfig.SslMode
	fmt.Printf(dsn)
	dbHandler, err := sql.Open(dbConfig.DatabaseDriver, dsn)
	if err != nil {
		return nil, err
	}
	return dbHandler, err
}
