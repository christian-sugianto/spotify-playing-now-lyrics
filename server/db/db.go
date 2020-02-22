package db

import (
	config "github.com/my-travel-bookie/server/config"
)

//DB instance
var DB *sql.DB

//Connect to db
func Connect() {
	// database info
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
	"password=%s dbname=%s sslmode=disable",
	config.HOST, config.POST, config.USER, config.PASSWORD, config.DBNAME)

	db, _ := sql.Open("postgres", dbinfo)
	err := db.Ping()
	if err != nil {
		log.Fatal("Error: Could not establish a connection with the database")
	}
	DB = db
	// Create "users" table if it doesnt exist
	CreateUsersTable()
}