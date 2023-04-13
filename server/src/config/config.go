package appconfig

import (
	"embed"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"gopkg.in/yaml.v3"
)

type PostgresInfo struct {
	Name            string        `yaml:"name"`
	Host            string        `yaml:"host"`
	Port            int           `yaml:"port"`
	Password        string        `yaml:"password"`
	User            string        `yaml:"user"`
	Schema          string        `yaml:"schema"`
	SslMode         string        `yaml:"sslmode"`
	MaxIdleConns    int           `yaml:"maxidleconns"`
	MaxOpenConns    int           `yaml:"maxopenconns"`
	ConnMaxLifeTime time.Duration `yaml:"connmaxlifetime"`
	ConnMaxIdleTime time.Duration `yaml:"-"`
	DatabaseDriver  string        `yaml:"databasedriver"`
}

var staticYamlDir embed.FS

// DatabaseInfo returns struct for connecting to postgres
func DatabaseInfo() *PostgresInfo {
	fileName := "config/yaml/config.local.yml"
	b, err := os.ReadFile(fileName)
	if err != nil {
		panic("failed to read. file=" + fileName + " err=" + err.Error())
	}
	gin.SetMode(gin.DebugMode)
	config := PostgresInfo{}
	yaml.Unmarshal(b, &config)
	return &config
}
