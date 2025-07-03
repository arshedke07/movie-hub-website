package services

import (
	"database/sql"
	"fmt"

	"github.com/arshedke07/stream-service/model"
)

func LoginUser(emailId string, password string, connectionString string) (*model.AppUser, error) {
	selectStatement := "SELECT user_id, firstname, lastname, emailid, password, usertype FROM app_user WHERE emailid=$1 and password=$2"
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return nil, err
	}

	defer db.Close()

	var user_id int
	var email string
	var firstname string
	var lastname string
	var pwd string
	var usertype string

	row := db.QueryRow(selectStatement, emailId, password)
	scanErr := row.Scan(&user_id, &firstname, &lastname, &email, &pwd, &usertype)
	if scanErr != nil {
		fmt.Println(scanErr)
		return nil, scanErr
	}

	user := model.AppUser{
		Id:        user_id,
		FirstName: firstname,
		LastName:  lastname,
		EmailId:   email,
		Password:  pwd,
		UserType:  usertype,
	}

	return &user, nil
}
