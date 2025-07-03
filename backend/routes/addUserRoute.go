package routes

import (
	"log"

	"github.com/arshedke07/stream-service/model"
	"github.com/arshedke07/stream-service/pkg/services"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

func AddUserRoute(c *fiber.Ctx) error {
	user := model.AppUser{
		FirstName: c.FormValue("firstname"),
		LastName:  c.FormValue("lastname"),
		EmailId:   c.FormValue("email"),
		Gender:    c.FormValue("gender"),
		Mobile:    c.FormValue("mobile"),
		Password:  c.FormValue("password"),
		// UserType:  c.FormValue("usertype"),
	}

	connectionString := "host=localhost port=5432 user=postgres password=1234 dbname=postgres sslmode=disable"
	data, err := services.AddUser(&user, connectionString)
	if err != nil {
		log.Println(err)
		return err
	}
	return c.JSON(data)
}
