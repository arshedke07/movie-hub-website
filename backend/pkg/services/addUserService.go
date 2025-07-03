package services

import (
	"database/sql"

	"github.com/arshedke07/stream-service/model"
)

func AddUser(user *model.AppUser, connectionString string) (*model.AppUser, error) {
	insertStatement := "INSERT INTO app_user(firstname, lastname, emailid, gender, mobile, password, usertype, createddate, updateddate) VALUES($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) returning user_id"
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return nil, err
	}

	defer db.Close()

	var id int
	row := db.QueryRow(insertStatement, user.FirstName, user.LastName, user.EmailId, user.Gender, user.Mobile, user.Password, nil)
	insertErr := row.Scan(&id)
	if insertErr != nil {
		return nil, insertErr
	}

	newUser := model.AppUser{
		Id:        id,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		EmailId:   user.EmailId,
		Gender:    user.Gender,
		Mobile:    user.Mobile,
		Password:  user.Password,
		// UserType:    user.UserType,
		CreatedDate: user.CreatedDate,
		UpdatedDate: user.UpdatedDate,
	}

	return &newUser, nil
}
